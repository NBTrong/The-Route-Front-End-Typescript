import React from 'react';
import { useNavigate } from 'react-router-dom';
import UrlService from '../../services/UrlService';

const apiDomain = UrlService.getApiDomain();
interface Props {
  name: string;
  description: string;
  img: string;
  slug: string;
  textButton: string;
}
export default function Box({
  name,
  description,
  img,
  textButton,
  slug,
} : Props) {
  const navigate = useNavigate();
  const redirect = (s: string) => {
    navigate(`/roadmap/${s}`);
  };
  return (
    <div className="box">
      <div className="image">
        <img src={`${apiDomain}/images/${img}`} alt="" />
        {/* <a href="#" className="fas fa-heart" /> */}
      </div>
      <div className="content">
        <div className="stars">
          <i className="fas fa-star"> </i>
          <i className="fas fa-star"> </i>
          <i className="fas fa-star"> </i>
          <i className="fas fa-star"> </i>
          <i className="fas fa-star-half-alt"> </i>
        </div>
        <h3>{name}</h3>
        <p>{description}</p>
        <div>
          <button
            className="btn"
            type="button"
            onClick={() => { redirect(slug); }}
          >
            {textButton}
          </button>
        </div>
      </div>
    </div>
  );
}
