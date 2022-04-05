import React, { useState, useEffect } from 'react';
import {
  Card, Badge, Input, Image,
} from 'antd';
import {
  LoadingOutlined, PlusOutlined, ReadOutlined, EditOutlined,
  DeleteOutlined, EnterOutlined, CloseOutlined, HeartOutlined,
  HeartFilled,
} from '@ant-design/icons';
import UrlServices from '../../services/UrlServices';

const { Meta } = Card;
const { TextArea } = Input;

export interface RoadmapCardProps {
  roadmap: {
    id: string;
    status: string;
    name: string;
    description: string;
    image: string;
    likes_count: number;
    liked: boolean;
  };
  onEdit: (options: {
    name: string;
    description: string;
    image: string;
  }) => void;
  onDelete: () => void;
  onOpen: () => void;
}

function uploadCover(
  id: string,
  status : string,
  imageSrc : string,
  onChange : (e : any) => void,
) {
  if (status === 'fetching') return <LoadingOutlined />;
  const uploadButton = (
    <div className="ant-upload-button">
      {status === 'loading' ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return status === 'view-only' || status === 'normal' || status === 'deleting' ? (
    <Image
      style={{ width: 300, height: 200 }}
      src={imageSrc}
      alt="Roadmap's cover"
    />
  ) : (
    <div className="avatar-cover" key="cover">
      {imageSrc ? (
        <img
          key="img"
          src={imageSrc}
          className="avatar-upload-img"
          style={{ width: 298, height: 198 }}
          alt={imageSrc}
        />
      ) : null}
      <label
        id={`${id}-cover`}
        htmlFor={`${id}-cover-input`}
        className="avatar-upload-title"
      >
        {uploadButton}
      </label>
      <input
        type="file"
        key="input-file"
        disabled={status === 'loading'}
        id={`${id}-cover-input`}
        accept="image/png, image/jpeg"
        className="avatar-upload-input"
        onChange={onChange}
      />
    </div>
  );
}

function RoadmapCard({
  roadmap,
  onEdit,
  onDelete,
  onOpen,
}: RoadmapCardProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [status, setStatus] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [imageFile, setImageFile] = useState('');

  const handleChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(URL.createObjectURL(img));
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
    onDelete();
  };

  const handleSubmit = () => {
    const options = {
      name,
      description: description === '' ? 'Empty' : description,
      image: imageFile,
    };
    setStatus('loading');
    onEdit(options);
  };

  const openButton = (
    <ReadOutlined key="open" onClick={onOpen} />
  );
  const enterButton = (
    <EnterOutlined key="enter" onClick={handleSubmit} />
  );
  const editButton = (
    <EditOutlined key="editing" onClick={handleEdit} />
  );
  const deleteButton = (
    <DeleteOutlined key="delete" onClick={handleDelete} />
  );
  const cancelButton = (
    <CloseOutlined
      key="close"
      onClick={() => {
        setStatus('normal');
        setName(roadmap.name);
        setDescription(roadmap.description);
        setImageSrc(roadmap.image);
      }}
    />
  );

  // Get action list for each status
  // Must preserve the number of actions when status changes
  const getActions = (s : string) => {
    let array : any[] = [];
    if (s === 'add') {
      array = [
        enterButton,
      ];
    } else if (s === 'normal') {
      array = [
        openButton,
        editButton,
        deleteButton,
      ];
    } else if (s === 'editing') {
      array = [
        enterButton,
        cancelButton,
        deleteButton,
      ];
    } else if (s === 'loading' || s === 'deleting') {
      // If the roadmap.name is null then this is an add card
      // therefore must maintain only a single action
      if (roadmap.name) {
        array.push(
          <LoadingOutlined key="open" />,
        );
        array.push(
          <LoadingOutlined key="delete" />,
        );
      }
      array.push(
        <LoadingOutlined key="enter" />,
      );
    } else {
      array = [
        openButton,
      ];
    }
    return array;
  };

  useEffect(() => {
    const shortenDescription = (s : string) => {
      if (s.length > 30) {
        return `${s.substring(0, 30)}...`;
      }
      return s;
    };
    setName(roadmap.name);
    setDescription(roadmap.description);
    setStatus(roadmap.status);
    setImageSrc(roadmap.image ? UrlServices.getImageUrl(roadmap.image) : '');
    setShortDescription(shortenDescription(roadmap.description));
  }, [roadmap]);

  useEffect(() => {
    setImageSrc(roadmap.image ? UrlServices.getImageUrl(roadmap.image) : '');
  }, [status, roadmap.image]);

  return (
    <div className="roadmap-card">
      <Card
        loading={status === 'fetching'}
        key={roadmap.id}
        cover={uploadCover(roadmap.id, status, imageSrc, handleChange)}
        className="roadmap-card-content"
        extra={(
          <div className="roadmap-card-extra">
            <div className="roadmap-card-extra-item">
              <Badge count={roadmap.likes_count} size="small">
                {roadmap.liked
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
          title={status === 'editing' || status === 'add'
            ? (
              <Input
                className="roadmap-card-title"
                bordered={false}
                value={name}
                placeholder="Create a new roadmap"
                onChange={(e) => setName(e.target.value)}
                onPressEnter={handleSubmit}
                key="input"
              />
            ) : <div className="roadmap-card-title">{name}</div>}
          description={status === 'editing' || status === 'add'
            ? (
              <TextArea
                autoSize={{ minRows: 1, maxRows: 1 }}
                className="roadmap-card-description"
                value={description}
                bordered={false}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : <div className="roadmap-card-description">{shortDescription}</div>}
        />
      </Card>
    </div>
  );
}

export default RoadmapCard;
