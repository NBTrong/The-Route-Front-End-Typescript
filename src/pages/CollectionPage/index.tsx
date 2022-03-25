import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Alert from '../../components/atoms/Alert';
import RoadmapService from '../../services/RoadmapService';
import RoadmapContainer from '../../components/molecules/RoadmapContainer';
// import { Header } from '../../components/Header';
// import { Loading } from '../../components/Loading';

function CollectionPage() {
  const { username } = useParams();
  const { type } = useParams();
  const [redirect, setRedirect] = useState({
    willRedirect: false,
    pathname: '/',
  });
  const initialData : any[] = [];
  const [data, setData] = useState(initialData);
  const [sameUser, setSameUser] = useState(false);

  useEffect(() => {
    RoadmapService.getRoadmaps(username || '', type || 'mine')
      .then((res) => {
        const newData = res.data;
        // Sort by updated_at
        newData.sort((a : any, b : any) => {
          const aDate : Date = new Date(a.updated_at);
          const bDate : Date = new Date(b.updated_at);
          if (aDate > bDate) {
            return -1;
          }
          if (aDate < bDate) {
            return 1;
          }
          return 0;
        });
        setData(newData);
        setSameUser(res.sameUser);
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
            const newRoadmap = res.roadmap;
            newRoadmap.status = 'normal';
            return newRoadmap;
          }
          return roadmap;
        });
        // Resort the roadmaps by updated_at
        newData.sort((a : any, b : any) => {
          const aDate : Date = new Date(a.updated_at);
          const bDate : Date = new Date(b.updated_at);
          if (aDate > bDate) {
            return -1;
          }
          if (aDate < bDate) {
            return 1;
          }
          return 0;
        });
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
        const newRoadmap = res.roadmap;
        newRoadmap.status = 'normal';
        const newData = [...data, newRoadmap];
        // Sort by updatedAt
        newData.sort((a : any, b : any) => {
          const aDate : Date = new Date(a.updated_at);
          const bDate : Date = new Date(b.updated_at);
          if (aDate > bDate) {
            return -1;
          }
          if (aDate < bDate) {
            return 1;
          }
          return 0;
        });
        setData(newData);
        setRedirect({
          willRedirect: true,
          pathname: `/roadmaps/${newRoadmap.slug}`,
        });
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
        Alert.success(res.message);
      })
      .catch((err) => {
        Alert.error(err);
      });
  };

  const onOpen = (slug : string) => {
    setRedirect({
      willRedirect: true,
      pathname: `/roadmaps/${slug}`,
    });
  };

  if (redirect.willRedirect) {
    return <Navigate to={redirect.pathname} />;
  }

  return (
    <div className="CollectionPage">
      {/* <Header
        signOut={props.signOut}
        key={50}
        key_props={50 + 1}
        signOut={props.signOut}
        user={props.user}
        getUser={props.getUser}
        updateUser={props.updateUser}
      /> */}
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
      {/* <Loading /> */}
    </div>
  );
}

export default CollectionPage;
