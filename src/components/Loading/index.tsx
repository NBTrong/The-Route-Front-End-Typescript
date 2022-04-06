/* eslint-disable global-require */
import React, { useEffect } from 'react';
import img from './loader3.gif';

function Loading() {
  const loader = () => {
    const loaderElement = document.querySelector('.loader-container');
    if (loaderElement) loaderElement.classList.add('fade-out');
  };

  useEffect(() => {
    setTimeout(loader, 2500);
  }, []);

  return (
    <div className="loader-container">
      <img src={img} alt="Loi" />
    </div>
  );
}

export default Loading;
