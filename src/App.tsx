// Hook
import React, { useState, useEffect } from 'react';
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
import RoadmapPage from './pages/RoadmapPage';

// Services
import AuthApi from './services/AuthApi';

// Styles
import './styles/index.scss';

function App() {
  const [token, setToken] = useState<string | null>('');
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
    <div className="App">
      <BrowserRouter>
        <Layout
          signOut={signOut}
        >
          <Routes>
            {/* <Route
              path="/"
              element={(
                <HomePage
                  signOut={signOut}
                  user={user}
                  getUser={getUser}
                  updateUser={updateUser}
                />
            )}
            /> */}
            <Route
              path="/roadmap/:slug"
              element={(
                <RoadmapPage />
              )}
            />
            {/* <Route
              path="/test"
              element={
                <Test signOut={signOut} />
            }
            />
            <Route
              path="/collection/:username"
              element={(
                <CollectionPage
                  signOut={signOut}
                  user={user}
                  getUser={getUser}
                  updateUser={updateUser}
                  type="mine"
                />
            )}
            />
            <Route
              path="/collection/:username/liked"
              element={(
                <CollectionPage
                  signOut={signOut}
                  user={user}
                  getUser={getUser}
                  updateUser={updateUser}
                  type="liked"
                />
            )}
            />
            <Route
              path="/collection/:username/followed"
              element={(
                <CollectionPage
                  signOut={signOut}
                  type="followed"
                />
            )}
            /> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
