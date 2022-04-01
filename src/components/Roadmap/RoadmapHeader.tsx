/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* Hooks */
import React, { useState } from 'react';

/* Components */
import {
  PageHeader, Button, Tag, Typography, Badge,
} from 'antd';

/* Icons */
import {
  HeartOutlined, HeartFilled, CommentOutlined, ShareAltOutlined,
} from '@ant-design/icons';

/* Services */
import UrlService from '../../services/UrlService';

const { Paragraph } = Typography;
const apiDomain = UrlService.getApiDomain();

interface PropsType {
  title: string,
  description: string,
  liked: boolean,
  like: Function,
  unlike: Function,
  duplicate: Function,
  avatar: string,
  authorUserName: string,
  likesCount: number,
  sameUser: boolean,
}

function RoadmapHeader({
  title,
  description,
  liked,
  like,
  unlike,
  duplicate,
  avatar,
  authorUserName,
  likesCount,
  sameUser,
}: PropsType) {
  const [hearted, setHearted] = useState(liked);
  const [likesCountState, setLikesCountState] = useState(likesCount);
  const paragraphs = description.split('\n');

  // HANDLE FUNCTIONS
  const handleClickHeart = () => {
    if (hearted === true) {
      unlike();
      setLikesCountState(likesCountState - 1);
      setHearted(false);
      return;
    }
    like();
    setLikesCountState(likesCountState + 1);
    setHearted(true);
  };

  // RETURN
  const content = (
    <>
      <div className="content-header">
        <Typography style={{ width: '100%' }}>
          <label style={{ fontWeight: 'bold', marginRight: '.5rem' }}>Description: </label>
          {paragraphs.map((paragraph, index) => (
            <Paragraph key={index}>{paragraph}</Paragraph>
          ))}
        </Typography>
      </div>
      <div className="reaction">
        <Badge count={likesCountState} size="small" offset={[3, 0]}>
          {hearted === true
            ? (
              <HeartFilled
                className="icon HeartFilled"
                onClick={handleClickHeart}
              />
            ) : (
              <HeartOutlined
                className="icon HeartOutLine"
                onClick={handleClickHeart}
              />
            )}
        </Badge>
        <CommentOutlined
          className="icon"
        />
        <ShareAltOutlined
          className="icon"
        />
      </div>
    </>
  );
  return (
    <PageHeader
      title={title}
      subTitle={`${authorUserName}`}
      className="site-page-header"
      tags={<Tag color="green">New</Tag>}
      extra={[
        <Button
          key="1"
          type="primary"
          color="green"
          onClick={() => { duplicate(); }}
          className="add-button"
        >
          {sameUser ? 'Duplicate' : 'Add'}
        </Button>,
      ]}
      avatar={{ src: `${apiDomain}/images/${avatar}` }}
    >
      {content}
    </PageHeader>
  );
}

export default RoadmapHeader;
