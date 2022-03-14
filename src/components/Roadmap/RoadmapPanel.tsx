/* Hook */
import React, { useContext, useMemo } from 'react';

/* Icons */
import { CloseOutlined } from '@ant-design/icons';

/* Components */
import { Card, PageHeader } from 'antd';
import TodoList from '../Todolist/TodoList';

/* Store */
import RoadmapContext from '../../store/RoadmapContext';
import Milestone from '../../model/Milestone';

function RoadmapPanelHeader({ name, description }: {
  name: string,
  description: string,
}) {
  const handleClosePanel = () => {
    document.querySelector('.roadmap-main')?.classList.toggle('roadmap-main-full');
    document.querySelector('.roadmapPanel')?.classList.toggle('panel-close');
  };

  return (
    <PageHeader
      title={name}
      className="site-page-header"
      extra={[
        <div className="close-container">
          <CloseOutlined className="close-element" onClick={handleClosePanel} />
        </div>,
      ]}
    >
      <div className="content">
        {description}
      </div>
    </PageHeader>
  );
}

function RoadmapPanel() {
  const { roadmap, currentMilestoneID } = useContext(RoadmapContext);
  const currentMilestone = useMemo(() => {
    const result = roadmap.milestones.find((milestone) => milestone.id === currentMilestoneID);
    if (result === undefined) return {} as Milestone;
    return result;
  }, [roadmap.milestones, currentMilestoneID]);

  return (
    <Card
      className="roadmapPanel panel-close"
      cover={(
        <RoadmapPanelHeader
          name={currentMilestone.name}
          description={currentMilestone.description}
        />
      )}
    >
      <TodoList currentMilestone={currentMilestone} />
    </Card>
  );
}

export default RoadmapPanel;
