// Hook
import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

// Components
import { message } from 'antd';
import Layout from './components/Layout';

// Pages
import Auth from './pages/AuthPage';
import HomePage from './pages/HomePage';
import RoadmapPage from './pages/RoadmapPage';
import CollectionPage from './pages/CollectionPage';

// Services
import AuthApi from './services/AuthApi';

// Styles
import './styles/index.scss';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const error = (mess: string) => {
    setTimeout(() => {
      message.error(mess);
    }, 500);
  };

  const signUp = async (e:any, UserName:string, Password:string) => {
    e.preventDefault();
    const data = { name: UserName, password: Password };
    try {
      const response = await AuthApi.createUser(data);
      if (response.message) {
        const accessToken = response.token.original.access_token;
        localStorage.setItem('token', accessToken);
        setToken(accessToken);
      } else {
        error('Sign up failed. Please try again.');
      }
    } catch {
      // Todo
    }
  };

  const signIn = async (e:any, UserName:string, Password:string) => {
    e.preventDefault();
    const data = { name: UserName, password: Password };
    try {
      const response = await AuthApi.loginUser(data);
      if (response.message) {
        const accessToken = response.token.original.access_token;
        localStorage.setItem('token', accessToken);
        setToken(accessToken);
      } else {
        error('Wrong name or password. Please try again.');
      }
    } catch {
      // Todo
    }
  };

  const signOut = async () => {
    try {
      const response = await AuthApi.signOut(token);
      if (response.message) {
        localStorage.setItem('token', '');
        setToken('');
      }
    } catch (e) {
      // TODO
    }
  };

  if (!token) {
    return (
      <Auth
        signUp={signUp}
        signIn={signIn}
      />
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Layout
          signOut={signOut}
        >
          <Routes>
            <Route
              path="/"
              element={(
                <HomePage />
            )}
            />
            <Route
              path="/roadmap/:slug"
              element={(
                <RoadmapPage />
              )}
            />
            <Route
              path="/collection/:username"
              element={(
                <CollectionPage />
            )}
            />
            <Route
              path="/collection/:username/:type"
              element={(
                <CollectionPage />
            )}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
