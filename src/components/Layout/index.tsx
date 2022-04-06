/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */

// Hook
import React, {
  useState, useEffect, ReactChild, useCallback, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';

// Component
import Portfolio from './Portfolio';
import UrlService from '../../services/UrlService';

// Services
import AuthApi from '../../services/AuthApi';

// Model
import User from '../../model/User';
import Loading from '../Loading';

interface TypeProps{
  children: ReactChild;
  signOut: () => void;
}

export default function Layout({ children, signOut }: TypeProps) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const token = useRef(localStorage.getItem('token'));
  const userData = {
    ...user,
    avatar: UrlService.getImageUrl(user.avatar),
  };

  const redirect = (url:any) => {
    navigate(`${url}`);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const getUser = useCallback(async () => {
    try {
      const response = await AuthApi.getUser(token.current);
      if (response.error === false) {
        setUser({
          id: response.user.id,
          name: response.user.name,
          userName: response.user.username,
          currentJob: response.user.current_job,
          email: response.user.email,
          avatar: response.user.avatar,
          isAdmin: response.user.is_admin,
          phone: response.user.phone,
          birthDate: response.user.birth_date,
        });
      }
    } catch (e) {
      // TODO
    }
  }, []);

  const updateUser = useCallback(async (data: any) => {
    try {
      const response = await AuthApi.updateUser(token.current, data);
      if (response.error === false) {
        setUser({
          id: response.user.id,
          name: response.user.name,
          userName: response.user.username,
          currentJob: response.user.current_job,
          email: response.user.email,
          avatar: response.user.avatar,
          isAdmin: response.user.is_admin,
          phone: response.user.phone,
          birthDate: response.user.birth_date,
        });
      }
    } catch (e) {
      // TODO
    }
  }, []);

  const handleEffect = () => {
    // Click thì hiện subHeader, bấm thêm lần nữa thì tắt
    document.querySelector('#icon-user')?.addEventListener('click', () => {
      const subHeader = document.querySelector('.subHeader');
      subHeader?.classList.toggle('active');
    });

    // Bật tắt form tìm kiếm
    document.querySelector('#search-icon')?.addEventListener('click', () => {
      document.querySelector('#search-form')?.classList.toggle('active');
    });

    document.querySelector('#close')?.addEventListener('click', () => {
      document.querySelector('#search-form')?.classList.remove('active');
    });

    // Chuyển màu ô được click
    const navBar = document.querySelectorAll('.navbar a');
    const remoteActive = () => {
      const elementHasActive = Object.values(navBar).filter((item) => item.className === 'active');
      elementHasActive[0]?.classList.remove('active');
    };
    remoteActive();
    navBar.forEach((item) => {
      item.addEventListener('click', () => {
        remoteActive();
        item.classList.add('active');
      });
    });
  };

  useEffect(() => {
    handleEffect();
  }, []);

  return (
    <>
      <form action="" id="search-form">
        <input type="search" placeholder="search here..." name="" id="search-box" />
        <label htmlFor="search-box" className="fas fa-search" />
        <i className="fas fa-times" id="close" />
      </form>
      <header>
        <a
          className="logo"
          onClick={() => { redirect('/'); }}
        >
          <i className="fas fa-route" id="logo" />
          The Route
        </a>

        <nav className="navbar">
          <a className="active" href="" onClick={() => { redirect('/'); }}>Home</a>
          <a onClick={() => { redirect(`/collection/${user.userName}`); window.location.reload(); }} role="link">Studying</a>
          <a className="not-coding" style={{ opacity: '0.5' }}>Menu</a>
          <a onClick={() => { redirect(`/collection/${user.userName}/liked`); window.location.reload(); }} role="link">Liked</a>
        </nav>

        <div className="icons">
          <i className="fas fa-search" id="search-icon" />
          <i className="fas fa-bell" />
          <i id="icon-user" className="fas fa-user">
            <div className="subHeader">
              <div onClick={showDrawer}>My Infomation</div>
              <div onClick={() => { redirect(`/collection/${user.userName}`); window.location.reload(); }}>Studying</div>
              <div onClick={signOut}>Logout</div>
            </div>
          </i>
        </div>

      </header>
      <Portfolio
        visible={visible}
        onClose={onClose}
        user={userData}
        getUser={getUser}
        updateUser={updateUser}
      />
      <Loading />
      {children}
    </>
  );
}
