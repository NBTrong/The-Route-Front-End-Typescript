import axios from 'axios';
import UrlService from './UrlService';

const getMilestones = async (username : string) => {
  const url = `${UrlService.getUserUrl(username)}/milestones`;
  const token = localStorage.getItem('token');
  return axios(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateMilestone = async (
  id : string,
  options : {
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    roadmapID: string,
    userID: string,
    type: string,
  },
) => {
  const url = UrlService.getMilestoneUrl(id);
  const data = {
    name: options.name,
    description: options.description,
    start_date: options.startDate,
    end_date: options.endDate,
    roadmap_id: options.roadmapID,
    user_id: options.userID,
    type: options.type,
  };
  const token = localStorage.getItem('token');
  return axios(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

const addMilestone = async (options : {
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  roadmapID: string,
  type: string,
}) => {
  const url = UrlService.getMilestoneUrl();
  const data = {
    name: options.name,
    description: options.description,
    start_date: options.startDate,
    end_date: options.endDate,
    roadmap_id: options.roadmapID,
    type: options.type,
  };
  const token = localStorage.getItem('token');
  return axios(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

const deleteMilestone = async (id : string) => {
  const url = UrlService.getMilestoneUrl(id);
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
  getMilestones,
  updateMilestone,
  addMilestone,
  deleteMilestone,
};
