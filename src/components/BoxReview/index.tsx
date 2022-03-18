import React from 'react';

export default function BoxReview({ name, reviewContent, img } : any) {
  return (
    <div className="swiper-slide slide">
      <i className="fas fa-quote-right" />
      <div className="user">
        <img src={img} alt="" />
        <div className="user-info">
          <h3>{name}</h3>
          <div className="stars">
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star-half-alt" />
          </div>
        </div>
      </div>
      <p>{reviewContent}</p>
    </div>
  );
}
