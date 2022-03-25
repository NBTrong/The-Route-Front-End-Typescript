/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* Hook */
import React, {
  useState, useEffect, useContext, ReactNode,
} from 'react';

/* Component */
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  List, Menu, Dropdown, Modal, Input,
} from 'antd';
// import DateSelector from '../DateSelector';
import checkdone from './icon/checked.svg';
import checkNoteDone from './icon/check-mark.svg';

/* Store */
import RoadmapContext from '../../store/RoadmapContext';
import Task from '../../model/Task';
import Milestone from '../../model/Milestone';

const { TextArea } = Input;

function TodoItem({ task, showModal }: { task: Task, showModal: Function }) {
  const { roadmap: { isRoadmapOwner }, dispatchRoadmap } = useContext(RoadmapContext);
  const [className, setClassName] = useState('');
  const [url, setUrl] = useState(checkNoteDone);
  const [content, setContent] = useState(task.content);
  const [completed, setCompleted] = useState(0);

  // HANDLE FUNCTIONS
  const handleOnComplete = () => {
    let Completed = 0;
    if (task.completed === 0) {
      Completed = 1;
    }
    setCompleted(Completed);
    const options = {
      completed: Completed,
    };
    dispatchRoadmap({ type: 'updateTask', id: task.id, options });
  };

  const handleOnBlurContent = () => {
    const options = {
      content,
    };
    if (content === task.content) return;
    dispatchRoadmap({ type: 'updateTask', id: task.id, options });
  };

  const handleOnChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleOnRemoveTask = () => {
    dispatchRoadmap({ type: 'removeTask', id: task.id });
  };

  useEffect(() => {
    setCompleted(task.completed);
  }, [task.completed]);

  useEffect(() => {
    if (completed) {
      setClassName('actives');
      setUrl(checkdone);
    } else {
      setClassName('');
      setUrl(checkNoteDone);
    }
  }, [completed]);

  const menu = (
    <Menu>
      <Menu.Item
        style={{ width: '7rem' }}
        onClick={() => showModal()}
      >
        Detail
      </Menu.Item>
      {isRoadmapOwner && (
        <Menu.Item
          style={{ width: '7rem' }}
          danger
          onClick={handleOnRemoveTask}
        >
          Remove
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <>
      <div className="todo-item">
        {isRoadmapOwner && (
          <img
            className="check"
            src={url}
            onClick={handleOnComplete}
            alt=""
          />
        )}
        <input
          type="text"
          className={`${task.completed ? 'complete' : ''} ${className} inputTask`}
          value={content}
          onBlur={handleOnBlurContent}
          onChange={handleOnChangeContent}
          disabled={!isRoadmapOwner}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleOnBlurContent();
            }
          }}
        />
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <DownOutlined style={{ color: 'black' }} />
          </a>
        </Dropdown>

      </div>
      <br />
    </>
  );
}

function TodoFooter() {
  const [content, setContent] = useState('');
  const { roadmap: { id }, currentMilestoneID, dispatchRoadmap } = useContext(RoadmapContext);

  // HANDLE FUNCTIONS
  const handleOnChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSubmitAddTask = () => {
    const options = {
      roadmapID: id,
      milestoneID: currentMilestoneID,
      content,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
    };
    dispatchRoadmap({ type: 'addTask', options });
    setContent('');
  };

  return (
    <div className="list-footer">
      <div className="list-footer-add-box">
        <input
          type="text"
          value={content}
          onChange={handleOnChangeContent}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSubmitAddTask();
            }
          }}
          className="list-footer-input container"
          placeholder="New task"
        />
        <button
          className="list-footer-add-btn small-btn"
          type="submit"
          onClick={handleSubmitAddTask}
        >
          <PlusOutlined className="small-btn" />
        </button>

      </div>
    </div>
  );
}

function TodoList({ currentMilestone }: { currentMilestone: Milestone }) {
  const { roadmap: { isRoadmapOwner }, dispatchRoadmap } = useContext(RoadmapContext);
  const [currentTask, setCurrentTask] = useState<Task>({} as Task);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // HANDLE FUNCTIONS
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const options = {
      note: currentTask.note,
    };
    dispatchRoadmap({ type: 'updateTask', id: currentTask.id, options });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    const CurrentTask = currentMilestone.tasks.find((task) => task.id === currentTask.id);
    if (CurrentTask === undefined) {
      return setCurrentTask({} as Task);
    }
    return setCurrentTask(CurrentTask);
  };

  //   function changeDate(startDate, endDate) {
  //     setCurrentTask({
  //       ...currentTask,
  //       startDate,
  //       endDate,
  //     });
  //   }

  const handleOnChangeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentTask({
      ...currentTask,
      note: e.target.value,
    });
  };
  const list = currentMilestone.tasks?.map((task) => (
    <TodoItem
      key={task.id}
      task={task}
      showModal={showModal}
    />
  ));

  return (
    <>
      <List
        className="todo-list"
        header={<div>Todo List</div>}
        footer={isRoadmapOwner ? <TodoFooter /> : <>Footer</>}
        size="large"
        bordered
        dataSource={list}
        renderItem={(item: ReactNode) => (
          <List.Item>
            {item}
          </List.Item>
        )}
      />
      <Modal
        title="Task details"
        className="details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* <DateSelector
          id={currentTask.id}
          startDate={currentTask.startDate}
          endDate={currentTask.endDate}
          changeDate={changeDate}
          hasType={false}
          isEditable={props.isEditable}
        /> */}
        <TextArea
          rows={10}
          className="textArea"
          value={currentTask.note}
          onChange={handleOnChangeNote}
          disabled={!isRoadmapOwner}
        />
      </Modal>
    </>
  );
}

export default TodoList;
