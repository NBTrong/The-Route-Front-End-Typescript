import React, { useState, useEffect } from 'react';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from 'react-router-dom';
import { message } from 'antd';
import Auth from './pages/authentication/Auth';
import AuthApi from './services/AuthApi';
import './App.css';

function App() {
  const [token, setToken] = useState<string | null>();
  const [, setUser] = useState({});

  const error = (mess: string) => {
    setTimeout(() => {
      message.error(mess);
    }, 500);
  };

  const signIn = async (e:any, UserName:string, Password:string) => {
    e.preventDefault();
    const data = { name: UserName, password: Password };
    try {
      const response = await AuthApi.createUser(data);
      if (response.message) {
        const accessToken = response.token.original.access_token;
        localStorage.setItem('token', accessToken);
        setToken(accessToken);
        setUser(response.user);
      } else {
        error('Sign up failed. Please try again.');
      }
    } catch {
      // Todo
    }
  };

  const signUp = async (e:any, UserName:string, Password:string) => {
    e.preventDefault();
    const data = { name: UserName, password: Password };
    try {
      const response = await AuthApi.loginUser(data);
      if (response.message) {
        const accessToken = response.token.original.access_token;
        localStorage.setItem('token', accessToken);
        setToken(accessToken);
        setUser(response.user);
      } else {
        error('Wrong name or password. Please try again.');
      }
    } catch {
      // Todo
    }
  };

  // const signOut = async () => {
  //   try {
  //     const response = await AuthApi.signOut(token);
  //     if (response.message) {
  //       localStorage.setItem('token', '');
  //       setToken('');
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const getUser = async () => {
  //   try {
  //     const response = await AuthApi.getUser(token);
  //     if (response.error == false) {
  //       setUser(response.user);
  //     }
  //   } catch (e) {

  //   }
  // };

  // const updateUser = async (data) => {
  //   try {
  //     const response = await AuthApi.updateUser(token, data);
  //     if (response.error == false) {
  //       setUser(response.user);
  //     }
  //   } catch (e) {

  //   }
  // };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [token]);

  if (!token) {
    return (
      <Auth
        signUp={signUp}
        signIn={signIn}
      />
    );
  }
  return (
    <div className="App">Batrong</div>
  );
}

export default App;
