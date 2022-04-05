/* Hooks */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/* Components */
import Alert from '../../components/atoms/Alert';
import RoadmapContainer from '../../components/RoadmapContainer';

/* Services */
import RoadmapService from '../../services/RoadmapService';

function CollectionPage() {
  const { username } = useParams();
  const { type } = useParams();
  const initialData : any[] = [];
  const [data, setData] = useState(initialData);
  const [sameUser, setSameUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    RoadmapService.getRoadmaps(username || '', type || 'mine')
      .then((res) => {
        const newData : any[] = res.data.data;
        // Sort by updated_at
        newData.sort((a : any, b : any) => +new Date(b.updated_at) - +new Date(a.updated_at));
        setData(newData);
        setSameUser(res.data.same_user);
      })
      .catch((err) => {
        Alert.error(err);
      });
  }, [username, type]);

  const onEdit = (slug : string, options : any) => {
    RoadmapService.updateRoadmap(slug, options)
      .then((res) => {
        const newData = data.map((roadmap : any) => {
          if (roadmap.slug === slug) {
            const newRoadmap = res.data.roadmap;
            newRoadmap.status = 'normal';
            return newRoadmap;
          }
          return roadmap;
        });
        // Resort the roadmaps by updated_at
        newData.sort((a : any, b : any) => +new Date(b.updated_at) - +new Date(a.updated_at));
        setData(newData);
        Alert.success('Roadmap updated successfully');
      })
      .catch((err) => {
        Alert.error(err);
      });
  };

  const onCreate = (options : any) => {
    RoadmapService.addRoadmap(options)
      .then((res) => {
        const newRoadmap = res.data.roadmap;
        newRoadmap.status = 'normal';
        const newData = [...data, newRoadmap];
        // Sort by updatedAt
        newData.sort((a : any, b : any) => +new Date(b.updated_at) - +new Date(a.updated_at));
        setData(newData);
        navigate(`/roadmap/${newRoadmap.slug}`);
        Alert.success('Roadmap created successfully');
      })
      .catch((err) => {
        Alert.error(err);
      });
  };

  const onDelete = (slug : string) => {
    RoadmapService.deleteRoadmap(slug)
      .then((res) => {
        const newData = data.filter((roadmap : any) => roadmap.slug !== slug);
        setData(newData);
        Alert.success(res.data.message);
      })
      .catch((err) => {
        Alert.error(err);
      });
  };

  const onOpen = (slug : string) => {
    navigate(`/roadmap/${slug}`);
  };

  return (
    <div className="CollectionPage">
      <div className="CollectionPage__container">
        <RoadmapContainer
          data={data}
          onEdit={onEdit}
          onCreate={onCreate}
          onDelete={onDelete}
          onOpen={onOpen}
          isAddable={sameUser}
        />
      </div>
    </div>
  );
}

export default CollectionPage;
