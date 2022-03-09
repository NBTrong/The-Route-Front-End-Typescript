import UrlService from './UrlService';

const apiDomain = UrlService.getApiDomain();
const createUser = async (data:any) => fetch(`${apiDomain}/api/register`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then((response) => response.json());

const loginUser = async (data:any) => fetch(`${apiDomain}/api/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then((response) => response.json());

const getUser = async (token:string) => fetch(`${apiDomain}/api/getUser`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}).then((response) => response.json());

const updateUser = async (token:string, data = {}) => fetch(`${apiDomain}/api/updateUser`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(data),
}).then((response) => response.json());

const signOut = async (token:string) => fetch(`${apiDomain}/api/logout`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}).then((response) => response.json());

export default {
  createUser,
  loginUser,
  getUser,
  updateUser,
  signOut,
};
