import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
// import { Loading } from '../../components/Loading';
import { message } from 'antd';
import img_a from './img/log.svg';
import img_b from './img/register.svg';

interface TypeProps {
  signUp: Function,
  signIn: Function
}

function Auth({ signUp, signIn }:TypeProps) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState('');
  const notInitialRender = useRef(false);

  const warning = (mess: string) => {
    setTimeout(() => {
      message.warning(mess);
    }, 500);
  };

  const handleSignUp = async (e:any) => {
    e.preventDefault();
    if (password !== confirm) {
      warning('Password and confirm password are not the same.');
    } else {
      signUp(e, username, password);
    }
  };

  const validateSignInFields = useCallback(() => {
    if (username.length > 0 && password.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [username.length, password.length]);

  const validateSignUpFields = useCallback(() => {
    if (username.length > 0 && password.length > 0 && confirm.length > 0) {
      if (username.length < 6) {
        setFormValid(false);
        setFormErrors('Username must be at least 6 characters.');
      } else if (password.length < 6) {
        setFormValid(false);
        setFormErrors('Password must be at least 6 characters.');
      } else if (password !== confirm) {
        setFormValid(false);
        setFormErrors('Password and confirm password are not the same.');
      } else {
        setFormValid(true);
        setFormErrors('Passwords are now the same.');
      }
    } else {
      setFormValid(false);
      setFormErrors('Please fill in all fields');
    }
  }, [confirm, password, username.length]);

  useEffect(() => {
    const signInBtn = document.querySelector('#sign-in-btn');
    const signUpBtn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.container');
    if (signInBtn === null || signUpBtn === null || container === null) return;
    signUpBtn.addEventListener('click', () => {
      container.classList.add('sign-up-mode');
      signInBtn.addEventListener('click', () => {
        container.classList.remove('sign-up-mode');
      });
    });
  }, []);

  useEffect(() => {
    validateSignInFields();
  }, [username, password, validateSignInFields]);

  useEffect(() => {
    const container = document.querySelector('.container');
    if (container && container.classList.contains('sign-up-mode')) {
      validateSignUpFields();
    }
  }, [username, password, confirm, validateSignUpFields]);

  useEffect(() => {
    if (notInitialRender.current) {
      warning(formErrors);
    } else {
      notInitialRender.current = true;
    }
  }, [formErrors]);

  return (
    <div id="auth">
      <div className="MAIN">
        <div className="container">
          <div className="forms-container">
            <div className="signin-signup">
              {/* đăng nhập */}
              <form method="POST" className="sign-in-form" onSubmit={(e) => signIn(e, username, password)}>
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                  <i className="fas fa-user" />
                  <input type="text" placeholder="Name" name="name" onChange={(e) => { setUserName(e.target.value); }} />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock" />
                  <input type="password" placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value); }} />
                </div>
                <input type="submit" value="Login" className="btn solid" />
                <p className="social-text">Or Sign in with social platforms</p>
                <div className="social-media">
                  {/* <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-google" />
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-linkedin-in" />
                  </a> */}
                </div>
                {/* đăng kí */}
              </form>
              <form method="POST" className="sign-up-form" data-disabled={!formValid} onSubmit={(e) => handleSignUp(e)}>
                <h2 className="title">Sign up</h2>
                <div className="input-field">
                  <i className="fas fa-user" />
                  <input type="text" placeholder="Name" name="name" onChange={(e) => { setUserName(e.target.value); }} />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock" />
                  <input type="password" placeholder="Password" name="password" onChange={(e) => { setPassword(e.target.value); }} />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock" />
                  <input type="password" placeholder="Confirm password" name="confirm" onChange={(e) => { setConfirm(e.target.value); }} />
                </div>
                <input type="submit" className="btn" value="Sign up" />
                <p className="social-text">Or Sign up with social platforms</p>
                <div className="social-media">
                  {/* <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-google" />
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-linkedin-in" />
                  </a> */}
                </div>
              </form>
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>New here ?</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                  ex ratione. Aliquid!
                </p>
                <button className="btn transparent" id="sign-up-btn" type="submit">
                  Sign up
                </button>
              </div>
              <img src={img_a} className="image" alt="" />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>One of us ?</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                  laboriosam ad deleniti.
                </p>
                <button className="btn transparent" id="sign-in-btn" type="submit">
                  Sign in
                </button>
              </div>
              <img src={img_b} className="image" alt="" />
            </div>
          </div>
        </div>
        {/* <Loading /> */}
      </div>
    </div>
  );
}
export default Auth;
