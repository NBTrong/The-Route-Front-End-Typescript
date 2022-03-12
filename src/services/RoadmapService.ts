import UrlService from './UrlServices';

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
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error);
    return { error };
  }
};

const getRoadmap = async (slug : string) => {
  const url = UrlService.getRoadmapUrl(slug);
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const roadmap = await response.json();
    return roadmap;
  } catch (error) {
    // console.error(error);
    return { error };
  }
};

const fullRoadmap = async (slug : string) => {
  const url = `${UrlService.getRoadmapUrl(slug)}/full`;
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const roadmap = await response.json();
    return roadmap;
  } catch (error) {
    // console.error(error);
    return { error };
  }
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
    image: options.image,
  };
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const roadmap = await response.json();
    return roadmap;
  } catch (error) {
    // console.log('Not able to update the roadmap');
    return { error };
  }
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
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const roadmap = await response.json();
    return roadmap;
  } catch (error) {
    // console.log('Not able to add the roadmap');
    return { error };
  }
};

const duplicateRoadmap = async (slug : string) => {
  const url = `${UrlService.getRoadmapUrl(slug)}/duplicate`;
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const roadmap = await response.json();
    return roadmap;
  } catch (error) {
    // console.log('Not able to duplicate the roadmap');
    return { error };
  }
};

const likeRoadmap = async (slug : string) => {
  const url = `${UrlService.getRoadmapUrl(slug)}/like`;
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const roadmap = await response.json();
    return roadmap;
  } catch (error) {
    // console.log('Not able to like the roadmap');
    return { error };
  }
};

const unlikeRoadmap = async (slug : string) => {
  const url = `${UrlService.getRoadmapUrl(slug)}/unlike`;
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const roadmap = await response.json();
    return roadmap;
  } catch (error) {
    // console.log('Not able to unlike the roadmap');
    return { error };
  }
};

const progress = async () => {
  const apiDomain = UrlService.getApiDomain();
  const token = localStorage.getItem('token');
  return fetch(`${apiDomain}/api/progress`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
};

const deleteRoadmap = async (slug : string) => {
  const url = UrlService.getRoadmapUrl(slug);
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const roadmap = await response.json();
    return roadmap;
  } catch (error) {
    // console.log('Not able to delete the roadmap');
    return { error };
  }
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
