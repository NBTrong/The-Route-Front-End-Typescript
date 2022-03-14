let apiDomain = '';
if (process.env.NODE_ENV === 'production') {
  apiDomain = '';
} else {
  apiDomain = 'http://127.0.0.1:8000';
}

const getApiDomain = () => apiDomain;

const getHomePageUrl = (path:string) => `${getApiDomain()}/api/${path}`;

const getUserUrl = (username:string) => `${getApiDomain()}/api/users/${username}`;

const getRoadmapUrl = (slug:string | null = null) => {
  if (slug) {
    return `${getApiDomain()}/api/roadmaps/${slug}`;
  }
  return `${getApiDomain()}/api/roadmaps`;
};

const getMilestoneUrl = (id: string | null = null) => {
  if (id) {
    return `${getApiDomain()}/api/milestones/${id}`;
  }
  return `${getApiDomain()}/api/milestones`;
};

const getTaskUrl = (id: string | null = null) => {
  if (id) {
    return `${getApiDomain()}/api/tasks/${id}`;
  }
  return `${getApiDomain()}/api/tasks`;
};

const getImageUrl = (path:string) => `${getApiDomain()}/images/${path}`;

export default {
  getApiDomain,
  getHomePageUrl,
  getUserUrl,
  getRoadmapUrl,
  getMilestoneUrl,
  getTaskUrl,
  getImageUrl,
};
