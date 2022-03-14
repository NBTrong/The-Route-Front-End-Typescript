import axios from 'axios';
import UrlService from './UrlService';

const getTasks = async (username : string) => {
  const url = `${UrlService.getUserUrl(username)}/tasks`;
  const token = localStorage.getItem('token');
  return axios(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const addTask = async (options : {
  content: string,
  startDate: string,
  endDate: string,
  milestoneID: string,
  roadmapID: string,
  userID: string,
  note: string,
}) => {
  const url = UrlService.getTaskUrl();
  const data = {
    content: options.content,
    start_date: options.startDate,
    end_date: options.endDate,
    roadmap_id: options.roadmapID,
    milestone_id: options.milestoneID,
    user_id: options.userID,
    note: options.note,
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

const updateTask = async (
  id: string,
  options: {
    content: string,
    completed: boolean,
    startDate: string,
    endDate: string,
    milestoneID: string,
    roadmapID: string,
    userID: string,
    note: string,
  },
) => {
  const url = UrlService.getTaskUrl(id);
  const data = {
    content: options.content,
    completed: options.completed,
    start_date: options.startDate,
    end_date: options.endDate,
    roadmap_id: options.roadmapID,
    milestone_id: options.milestoneID,
    user_id: options.userID,
    note: options.note,
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

const removeTask = async (id: string) => {
  const url = UrlService.getTaskUrl(id);
  const token = localStorage.getItem('token');
  return axios(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getTasks,
  addTask,
  updateTask,
  removeTask,
};
