import axios from 'axios';
import UrlService from './UrlService';

const getRoadmaps = async (
  username : string,
  type : string,
  // options : {
  //   type : string,
  // }
) => {
  // options = {
  //     ...options,
  // };
  const roadmapQuery = (t : string) => {
    switch (t) {
      case 'mine':
        return '/roadmaps';
      case 'liked':
        return '/liked-roadmaps';
      case 'followed':
        return '/followed-roadmaps';
      default:
        return '/roadmaps';
    }
  };
  const url = UrlService.getUserUrl(username) + roadmapQuery(type);
  const token = localStorage.getItem('token');
  return axios(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
};
const getRoadmap = async (slug : string) => {
  const url = UrlService.getRoadmapUrl(slug);
  const token = localStorage.getItem('token');
  return axios(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const fullRoadmap = async (slug : string) => {
  const url = `${UrlService.getRoadmapUrl(slug)}/full`;
  const token = localStorage.getItem('token');
  return axios(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateRoadmap = async (
  slug : string,
  options : {
    name: string,
    description: string,
    image: string,
    current: number,
  },
) => {
  const url = UrlService.getRoadmapUrl(slug);
  const data = {
    name: options.name,
    description: options.description,
    current: options.current,
    // image: options.image,
  };
  const token = localStorage.getItem('token');
  return axios(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(data),
  });
};

const addRoadmap = async (
  options: {
    name: string,
    description: string,
    image: string,
  },
) => {
  const url = UrlService.getRoadmapUrl();
  const data = {
    name: options.name,
    description: options.description,
    image: options.image,
  };
  const token = localStorage.getItem('token');
  return axios(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(data),
  });
};

const duplicateRoadmap = async (slug : string) => {
  const url = `${UrlService.getRoadmapUrl(slug)}/duplicate`;
  const token = localStorage.getItem('token');
  return axios(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const likeRoadmap = async (slug : string) => {
  const url = `${UrlService.getRoadmapUrl(slug)}/like`;
  const token = localStorage.getItem('token');
  return axios(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const unlikeRoadmap = async (slug : string) => {
  const url = `${UrlService.getRoadmapUrl(slug)}/unlike`;
  const token = localStorage.getItem('token');
  return axios(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const progress = async () => {
  const apiDomain = UrlService.getApiDomain();
  const token = localStorage.getItem('token');
  return axios(`${apiDomain}/api/progress`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteRoadmap = async (slug : string) => {
  const url = UrlService.getRoadmapUrl(slug);
  const token = localStorage.getItem('token');
  return axios(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getRoadmaps,
  getRoadmap,
  fullRoadmap,
  updateRoadmap,
  addRoadmap,
  duplicateRoadmap,
  likeRoadmap,
  unlikeRoadmap,
  progress,
  deleteRoadmap,
};
