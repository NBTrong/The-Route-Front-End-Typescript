/* Hooks */
import React, {
  useState, useMemo,
} from 'react';
import { useParams } from 'react-router-dom';

/* Icons */
import { PlusCircleOutlined } from '@ant-design/icons';

/* Component */
import { Card } from 'antd';
import RoadmapHeader from '../../components/Roadmap/RoadmapHeader';
import ModalAddMilestone from '../../components/Milestone/ModalAddMilestone';
import MilestoneList from '../../components/Milestone/MilestoneList';

/* Hook custom */
import useRoadmap from '../../hooks/useRoadmap';

/* Store */
import RoadmapContext from '../../store/RoadmapContext';
import RoadmapPanel from '../../components/Roadmap/RoadmapPanel';

function RoadmapPage() {
  const { slug } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { roadmap, dispatchRoadmap, duplicateRoadmap } = useRoadmap(slug || '');
  const [currentMilestoneID, setCurrentMilestoneID] = useState('');
  const valueContext = useMemo(() => ({
    roadmap,
    dispatchRoadmap,
    currentMilestoneID,
    setCurrentMilestoneID,
  }), [roadmap, dispatchRoadmap, currentMilestoneID, setCurrentMilestoneID]);

  // HANDLE FUNCTIONS
  const showModalAddMileStone = () => {
    setIsModalVisible(true);
  };

  const handleOk = (formData: any) => {
    setConfirmLoading(true);
    dispatchRoadmap({ type: 'addMilestone', options: formData });
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // RETURN
  if (Object.keys(roadmap).length === 0) {
    return (<>Loading ...</>);
  }

  return (
    <RoadmapContext.Provider value={valueContext}>
      <div className="roadmap-container">
        <div className="roadmap">
          <Card
            bordered={false}
            cover={(
              <RoadmapHeader
                title={roadmap.name}
                description={roadmap.description}
                avatar={roadmap.author.avatar}
                authorUserName={roadmap.author.userName}
                likesCount={roadmap.likeCount}
                liked={roadmap.liked}
                like={() => dispatchRoadmap({ type: 'likeRoadmap' })}
                unlike={() => dispatchRoadmap({ type: 'unlikeRoadmap' })}
                duplicate={() => duplicateRoadmap()}
                sameUser={roadmap.isRoadmapOwner}
              />
            )}
            className="roadmap-main roadmap-main-full"
          >
            {roadmap.isRoadmapOwner
            && (
              <div className="button-add-roadmap">
                <PlusCircleOutlined
                  className="icon"
                  onClick={showModalAddMileStone}
                />
              </div>
            )}
            <ModalAddMilestone
              isModalVisible={isModalVisible}
              confirmLoading={confirmLoading}
              handleOk={handleOk}
              handleCancel={handleCancel}
            />
            <MilestoneList />
          </Card>
          <RoadmapPanel />
        </div>
      </div>
    </RoadmapContext.Provider>
  );
}

export default RoadmapPage;
