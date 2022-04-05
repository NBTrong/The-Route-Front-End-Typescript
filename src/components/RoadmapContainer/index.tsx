import React from 'react';
import { Row, Col } from 'antd';
import RoadmapCard from '../RoadmapCard';
// import UrlService from '../../services/UrlService';

export interface RoadmapContainerProps {
  data: {
    id: string;
    name: string;
    description: string;
    slug: string;
    image: string;
    likes_count: number;
    liked: boolean;
    status: string;
  }[];
  onEdit: (
    slug : string,
    options: {
      name: string;
      description: string;
      image: string;
    }) => void;
  onCreate: (options: {
    name: string;
    description: string;
    image: string;
  }) => void;
  onDelete: (slug : string) => void;
  onOpen: (slug : string) => void;
  isAddable: boolean;
}

function RoadmapContainer({
  data,
  // onChangeType,
  onEdit,
  onCreate,
  onDelete,
  onOpen,
  isAddable,
} : RoadmapContainerProps) {
  // const getTypeName = (type) => {
  //   switch (type) {
  //     case 'all':
  //       return 'All';
  //     case 'mine':
  //       return 'My Roadmaps';
  //     case 'public':
  //       return 'Public';
  //     case 'private':
  //       return 'Private';
  //     case 'liked':
  //       return 'Liked';
  //     case 'watching':
  //       return 'Watching';
  //     default:
  //       return 'All';
  //   }
  // };
  return (
    <div className="roadmap-container_collection">
      {/* <div className="buttons">
        { types.map(
            (type) => (
              <button
                className={type === state.type && 'active'}
                onClick={handleTypeChange}
              >
                { getTypeName(type) }
              </button>
            )
          )
        }
      </div> */}
      {/* <div className="header">
        <p>
          Showing
          {' '}
          <b>All</b>
          {' '}
          roadmaps for
          {' '}
          <b>{getTypeName(type)}</b>
        </p>
        <select>
          <option>All Roadmaps</option>
        </select>
      </div> */}
      <Row
        className="roadmap-cards"
        gutter={[16, 16]}
        justify="start"
      >
        {isAddable && (
          <Col
            key={-1}
            span={6}
          >
            <RoadmapCard
              key={-1}
              roadmap={{
                id: '-1',
                status: 'add',
                name: '',
                description: 'Empty',
                image: '',
                likes_count: 0,
                liked: false,
              }}
              onEdit={onCreate}
              onDelete={() => {}}
              onOpen={() => {}}
            />
          </Col>
        )}
        {
          data.map(
            (roadmap) => (
              <Col
                key={roadmap.id}
                span={6}
                style={{ maxWidth: '25%' }}
              >
                <RoadmapCard
                  key={roadmap.id}
                  roadmap={roadmap}
                  onEdit={(options) => onEdit(roadmap.slug, options)}
                  onDelete={() => onDelete(roadmap.slug)}
                  onOpen={() => onOpen(roadmap.slug)}
                />
              </Col>
            ),
          )
        }
      </Row>
    </div>
  );
}

export default RoadmapContainer;
