import axios from 'axios';
import UrlService from './UrlService';

const getHomePage = async (path : string) => {
  const url = UrlService.getHomePageUrl(path);
  const token = localStorage.getItem('token');
  return axios(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getHomePage,
};
