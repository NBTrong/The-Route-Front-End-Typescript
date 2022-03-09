import React, { useState, useEffect } from 'react';
import {
  Card, Badge, Input, Image,
} from 'antd';
import {
  LoadingOutlined, PlusOutlined, ReadOutlined, EditOutlined,
  DeleteOutlined, EnterOutlined, CloseOutlined, HeartOutlined,
  HeartFilled,
} from '@ant-design/icons';

import 'antd/dist/antd.css';

const { Meta } = Card;
const { TextArea } = Input;

interface RoadmapCardProps {
  id: number;
  status: string;
  name: string;
  description: string;
  image: string;
  likes: number;
  liked: boolean;
  onEdit: (options: {
    name: string;
    description: string;
    image: string;
  }) => void;
  onDelete: () => void;
  onOpen: () => void;
}

function RoadmapCard(props: RoadmapCardProps) {
  const [status, setStatus] = useState(props.status);
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [shortDescription, setShortDescription] = useState(props.description);
  const [image, setImage] = useState(props.image);
  const [imageFile, setImageFile] = useState('');

  const handleChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(URL.createObjectURL(img));
        setImageFile(reader.result as string);
      };
      reader.readAsDataURL(img);
    }
  };

  const handleEdit = () => {
    if (status !== 'editing') {
      setStatus('editing');
    }
  };

  const handleDelete = () => {
    setStatus('deleting');
    props.onDelete();
  };

  const handleSubmit = () => {
    if (name === props.name && description === props.description && imageFile === props.image) {
      setStatus('normal');
      return;
    }
    const options = {
      name,
      description: description === '' ? 'Empty' : description,
      image: imageFile,
    };
    setStatus('loading');
    props.onEdit(options);
  };

  const shortenDescription = (d: string) => {
    if (d.length > 100) {
      return `${d.substring(0, 100)}...`;
    }
    return d;
  };

  const titleName = (status === 'edit') ? (
    <Input
      className="roadmap-card-title"
      bordered={false}
      placeholder="Create a new roadmap"
      value={name}
      onChange={(e) => setName(e.target.value)}
      onPressEnter={handleSubmit}
      key="input"
    />
  ) : name;
  // Get the image from the url for the card
  const uploadCover = (s : string) => {
    if (s === 'fetching') return <LoadingOutlined />;
    const uploadButton = (
      <div className="ant-upload-button">
        {s === 'loading' ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return s === 'view-only' || s === 'done' || s === 'deleting' ? (
      <Image
        style={{ width: 300, height: 200 }}
        src={imageFile}
        alt="Roadmap's cover"
      />
    ) : (
      <div className="avatar-cover" key="cover">
        {image ? (
          <img
            key="img"
            src={image}
            className="avatar-upload-img"
            style={{ width: 300, height: 200 }}
            alt={image}
          />
        ) : null}
        <label
          id={`${props.id}-cover`}
          htmlFor={`${props.id}-cover-input`}
          className="avatar-upload-title"
        >
          {uploadButton}
        </label>
        <input
          type="file"
          key="input-file"
          disabled={status === 'loading'}
          id={`${props.id}-cover-input`}
          accept="image/png, image/jpeg"
          className="avatar-upload-input"
          onChange={handleChange}
        />
      </div>
    );
  };
  // Get action list for each status
  // Must preserve the number of actions when status changes
  const getActions = (s : string) => {
    let actions : any[] = [];
    if (s === 'view-only') {
      actions = [
        <ReadOutlined key="open" onClick={props.onOpen} />,
      ];
    } else if (s === 'add') {
      actions = [
        <EnterOutlined
          key="enter"
          onClick={handleSubmit}
        />,
        <DeleteOutlined
          key="delete"
          onClick={handleDelete}
        />,
      ];
    } else if (s === 'normal') {
      actions = [
        <ReadOutlined key="open" onClick={props.onOpen} />,
        <EditOutlined key="edit" onClick={handleEdit} />,
        <DeleteOutlined key="delete" onClick={handleDelete} />,
      ];
    } else if (s === 'edit') {
      actions = [
        <EnterOutlined
          key="enter"
          onClick={handleSubmit}
        />,
        <CloseOutlined
          key="close"
          onClick={() => {
            setStatus('normal');
            setName(props.name);
            setDescription(props.description);
            setImage(props.image);
          }}
        />,
        <DeleteOutlined
          key="delete"
          onClick={handleDelete}
        />,
      ];
    } else if (s === 'loading' || s === 'deleting') {
      // If the props.name is null then this is an add card
      // therefore must maintain only a single action
      if (props.name) {
        actions.push(
          <LoadingOutlined key="open" />,
        );
        actions.push(
          <LoadingOutlined key="delete" />,
        );
      }
      actions.push(
        <LoadingOutlined key="enter" />,
      );
    }
    return actions;
  };
  useEffect(() => {
    setShortDescription(shortenDescription(description));
  }, [description]);
  useEffect(() => {
    setStatus(props.status);
    setImage(props.image);
    setName(props.name);
    setDescription(props.description);
  }, [props.status, props.image, props.name, props.description]);

  return (
    <Card
      loading={status === 'fetching'}
      key={name}
      cover={uploadCover(status)}
      className="roadmap-card"
      extra={(
        <div className="roadmap-card-extra">
          <div className="roadmap-card-extra-item">
            <Badge count={props.likes} size="small">
              {props.liked
                ? <HeartFilled className="icon HeartFilled" />
                : <HeartOutlined className="icon Heart" />}
            </Badge>
          </div>
        </div>
      )}
      style={{ width: 300 }}
      actions={getActions(status)}
    >
      <Meta
        title={titleName}
        description={status === 'edit'
          ? (
            <TextArea
              autoSize={{ minRows: 1, maxRows: 4 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          )
          : shortDescription}
      />
    </Card>
  );
}
