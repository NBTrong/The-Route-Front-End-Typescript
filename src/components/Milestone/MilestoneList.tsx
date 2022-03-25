/* Hook */
import React, { useContext, useState } from 'react';

/* Components */
import { Steps } from 'antd';
import Milestone from './Milestone';

/* Icon */
import checkdone from './icon/checked.svg';

/* Store */
import RoadmapContext from '../../store/RoadmapContext';

const { Step } = Steps;

function MilestoneList() {
  const { roadmap, dispatchRoadmap } = useContext(RoadmapContext);
  const [current, setCurrent] = useState(roadmap.current);

  const handleImplementationProcessMileStone = (Current: number) => {
    const options = {
      ...roadmap,
      current: Current,
    };
    setCurrent(Current);
    dispatchRoadmap({ type: 'updateRoadmap', options });
  };

  return (
    <Steps
      direction="vertical"
      key={1}
      current={current}
      percent={100}
      responsive
      style={{ display: 'flex' }}
      className="milestone-list"
    >
      {roadmap.milestones && roadmap.milestones.map((milestone, index) => (
        <Step
          className="step"
          description={(
            <Milestone
              key={milestone.id}
              milestoneID={milestone.id}
              index={index}
              milestone={milestone}
              handleImplementationProcessMileStone={handleImplementationProcessMileStone}
            />
          )}
          key={`milestone-${milestone.id}`}
          icon={index >= roadmap.current ? false : <img src={checkdone} alt="" />}
        />
      ))}
    </Steps>
  );
}

export default MilestoneList;
