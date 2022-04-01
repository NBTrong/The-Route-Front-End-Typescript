// Hook
import React, { useState, useEffect } from 'react';

// Component
import { Drawer, Button, Space } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

// Services
import RoadmapService from '../../services/RoadmapService';

// Model
import User from '../../model/User';

interface PortfolioProps {
  visible: boolean,
  user: User,
  onClose: () => void,
  getUser: () => void,
  updateUser: (data:any) => void,
}

interface AvatarProps {
  handleImageChange: (event: any) => void,
  formData: {
    [key: string]: any
  }
}

function Avatar({ handleImageChange, formData }: AvatarProps) {
  const uploadButton = (
    <div className="ant-upload-button">
      {/* <PlusOutlined /> */}
      <div className="ant-upload-text" />
    </div>
  );
  return (
    <div
      className="user-avatar"
      key="user-cover"
      style={{ width: '100%', height: '100%' }}
    >
      {formData.avatar ? (
        <img
          key="img"
          src={formData.avatar}
          className="user-avatar-upload"
          style={{ width: '100%', height: '100%' }}
          alt=""
        />
      )
        : null}
      <label id={formData.userName} htmlFor={`user-avatar-${formData.userName}`} className="user-avatar-upload-title">
        {uploadButton}
      </label>
      <input
        type="file"
        key="user-input-file"
        id={`user-avatar-${formData.userName}`}
        accept="image/png, image/jpeg"
        className="user-avatar-upload-input"
        onChange={handleImageChange}
      />
    </div>
  );
}

function Portfolio({
  visible, onClose, user, getUser, updateUser,
}: PortfolioProps) {
  const [progress, setProgress] = useState([]);
  const [formData, setFormData] = useState({
    userName: user.userName,
    avatar: user.avatar,
    email: user.email,
    phone: user.phone,
    currentJob: user.currentJob,
    file: null as any,
  });

  useEffect(() => {
    setFormData({
      userName: user.userName,
      avatar: user.avatar,
      email: user.email,
      phone: user.phone,
      currentJob: user.currentJob,
      file: null,
    });
  }, [user]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    async function getProgress() {
      try {
        const response = await RoadmapService.progress();
        setProgress(response.data);
      } catch (e) {
        // TODO
      }
    }
    getProgress();
  }, [visible]);

  const handleImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          avatar: URL.createObjectURL(img),
          file: reader.result,
        });
      };
      reader.readAsDataURL(img);
    }
  };

  const handleOnChange = (e: any) => {
    setFormData({
      ...formData,
      [`${e.target.name}`]: e.target.value,
    });
  };

  const handleOnClick = () => {
    onClose();
    const options: {
      [key: string]: any
    } = {
      username: formData.userName,
      email: formData.email,
      phone: formData.phone,
      current_job: formData.currentJob,
    };
    if (formData.file) {
      options.avatar = formData.file;
    }
    updateUser(options);
  };

  return (
    <Drawer
      key={3}
      title={user.name}
      placement="left"
      width={443}
      onClose={onClose}
      visible={visible}
      extra={(
        <Space>
          <Button type="primary" onClick={handleOnClick}>
            Save
          </Button>
        </Space>
      )}
    >
      <div className="Portfolio-container w3-content w3-margin-top" style={{ maxWidth: '1400px;' }}>

        <div className="w3-white w3-text-grey ">
          {/* w3-card-4 */}
          <div className="w3-display-container">
            <Avatar
              handleImageChange={handleImageChange}
              formData={formData}
            />
          </div>
          <div className="w3-container w3-margin-top">
            <p>
              <i className="fa fa-user-circle fa-fw w3-margin-right w3-large w3-text-teal" />
              <input onChange={handleOnChange} name="userName" type="text" defaultValue={user.userName || ''} />
            </p>
            <p>
              <i className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal" />
              <input onChange={handleOnChange} name="currentJob" type="text" defaultValue={user.currentJob || ''} />
            </p>
            <p>
              <i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal" />
              <input onChange={handleOnChange} name="email" type="text" defaultValue={user.email || ''} />
            </p>
            <p>
              <i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal" />
              <input onChange={handleOnChange} name="phone" type="text" defaultValue={user.phone || ''} />
            </p>
            <br />

            <p className="w3-large">
              <b>
                <i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal" />
                Skills
              </b>
            </p>
            {progress && progress.map((skill:any) => {
              const num = (skill.current / skill.totalMilestone) * 100;
              let length = num;
              if (num < 12.8) {
                length = num + 14;
              }
              return (
                <div key={skill.id}>
                  <p style={{ marginBottom: '0.7rem' }}>{skill?.name}</p>
                  <div style={{ overflow: 'hidden', marginBottom: '1rem' }} className="w3-light-grey w3-round-xlarge w3-small">
                    <div className="w3-container w3-center w3-round-xlarge w3-teal" style={{ width: `${length}%` }}>{`${num.toFixed(0)}%`}</div>
                  </div>
                </div>
              );
            })}
            <br />
          </div>
        </div>
        <br />
      </div>
    </Drawer>
  );
}

export default Portfolio;
