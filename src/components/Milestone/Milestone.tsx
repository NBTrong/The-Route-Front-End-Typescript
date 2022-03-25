/* eslint-disable jsx-a11y/anchor-is-valid */
/* Hook */
import React, {
  useContext, useEffect, useState,
} from 'react';

/* Icons */
import { EllipsisOutlined } from '@ant-design/icons';
import 'boxicons';

/* Component */
import { Tag, Menu, Dropdown } from 'antd';
import DateSelector from '../DateSelector';

/* Store */
import RoadmapContext from '../../store/RoadmapContext';

/* Model */
import MilestoneModel from '../../model/Milestone';

interface PropsType {
  milestoneID: string,
  milestone: MilestoneModel,
  index:number,
  handleImplementationProcessMileStone: (current: number) => void
}

interface Input {
  name: string,
  description: string
}

function Milestone({
  milestoneID,
  index,
  milestone,
  handleImplementationProcessMileStone,
}: PropsType) {
  const { roadmap, dispatchRoadmap, setCurrentMilestoneID } = useContext(RoadmapContext);
  const [inputValues, setInputValues] = useState<Input>({} as Input);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [type, setType] = useState<'date' | 'month' | 'year'>('date');
  const [count, setCount] = useState(0);
  const [colorStatus, setColorStatus] = useState('');
  const [sum, setSum] = useState(0);

  // HANDLE FUNCTION
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnBlurName = () => {
    const { name } = inputValues;
    if (name === milestone.name) return;
    const options = {
      name,
    };
    dispatchRoadmap({ type: 'updateMilestone', id: milestoneID, options });
  };

  const handleOnBlurDescription = () => {
    const { description } = inputValues;
    if (description === milestone.description) return;
    const options = {
      description,
    };
    dispatchRoadmap({ type: 'updateMilestone', id: milestoneID, options });
  };

  const handleChangeDate = (sd: Date, ed: Date, t: 'date' | 'month' | 'year') => {
    setStartDate(sd);
    setEndDate(ed);
    setType(t);
    const options = {
      startDate: sd,
      endDate: ed,
      type: t,
    };
    dispatchRoadmap({ type: 'updateMilestone', options, id: milestoneID });
  };

  const handleOpenPanel = () => {
    const roadmapMain = document.querySelector('.roadmap-main');
    const panel = document.querySelector('.roadmapPanel');
    if (panel?.classList.value.includes('panel-close')) {
      roadmapMain?.classList.toggle('roadmap-main-full');
      panel.classList.toggle('panel-close');
    }
    setCurrentMilestoneID(milestone.id);
  };

  // EFFECT
  useEffect(() => {
    setInputValues({
      name: milestone.name,
      description: milestone.description,
    });
  }, [milestone.name, milestone.description]);

  useEffect(() => {
    setSum(milestone.tasks.length);
  }, [milestone.tasks.length]);

  useEffect(() => {
    let Count = 0;
    milestone.tasks.forEach((task) => {
      if (task.completed === 1) {
        Count += 1;
      }
    });
    setCount(Count);
  }, [milestone.tasks]);

  useEffect(() => {
    if (count >= sum / 2) {
      setColorStatus('green');
    } else {
      setColorStatus('red');
    }
  }, [count, sum]);

  // RETURN
  const menu = (
    <Menu style={{ width: '10rem' }}>
      {roadmap.isRoadmapOwner
        ? (
          <Menu.Item
            key={1}
            onClick={() => handleImplementationProcessMileStone(index)}
          >
            Start
          </Menu.Item>
        ) : ''}
      <Menu.Item key={2} onClick={handleOpenPanel}>
        Show task
      </Menu.Item>
      {roadmap.isRoadmapOwner ? <Menu.Item key={3} danger onClick={() => dispatchRoadmap({ type: 'deleteMileStone', id: milestoneID })}>Delete</Menu.Item> : ''}
    </Menu>
  );

  return (
    <div className="milestone-todo-list">
      <div className="blog-slider">
        <div className="drop-down">
          <Dropdown overlay={menu} trigger={['click']}>
            <a
              className="ant-dropdown-link"
              style={{ color: '#27ae60' }}
              onClick={(e) => e.preventDefault()}
              href="#"
            >
              <EllipsisOutlined
                className="icon"
                style={{ color: '#ccc', fontSize: '1.2rem' }}
              />
            </a>
          </Dropdown>
        </div>

        <div className="blog-slider__wrp">
          <div className="blog-slider__item">
            <div className="blog-slider__content">
              <div className="blog-slider__title">
                <input
                  type="text"
                  className="name"
                  name="name"
                  value={inputValues.name}
                  disabled={!roadmap.isRoadmapOwner}
                  onBlur={handleOnBlurName}
                  onChange={handleOnChange}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      handleOnBlurName();
                    }
                  }}
                />
              </div>
              <div className="blog-slider__text">
                <span style={{ color: 'black', marginRight: '.2rem' }}>Description: </span>
                <input
                  type="text"
                  className="list-header-description"
                  name="description"
                  value={inputValues.description}
                  disabled={!roadmap.isRoadmapOwner}
                  onBlur={handleOnBlurDescription}
                  onChange={handleOnChange}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      handleOnBlurDescription();
                    }
                  }}
                />
              </div>
              <DateSelector
                id={milestoneID}
                startDate={startDate}
                endDate={endDate}
                type={type}
                isEditable={roadmap.isRoadmapOwner}
                changeDate={handleChangeDate}
                hasType
              />
              <div className="tag">
                <span style={{ color: 'black' }}>Status: </span>
                <Tag
                  color={colorStatus}
                  style={{ marginLeft: '2.9rem' }}
                >
                  {`${count}/${sum}`}
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Milestone;
