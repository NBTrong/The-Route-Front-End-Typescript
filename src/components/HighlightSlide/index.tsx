import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import UrlService from '../../services/UrlService';

interface Props {
  data: any;
}
SwiperCore.use([Pagination, Autoplay]);
export default function HighlightSlide({ data = [] }: Props) {
  const navigate = useNavigate();
  const renderSlide = (item: any, index: number) => {
    const redirect = (slug: string) => {
      navigate(`/roadmap/${slug}`);
    };
    const shortDescription = item.description && item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description;
    return (
      <SwiperSlide key={index}>
        <div className="slide">
          <div className="content">
            <span>Some of our roadmaps!</span>
            <h3>{item.name}</h3>
            <p>{shortDescription}</p>
            <button
              type="button"
              className="btn"
              onClick={() => redirect(item.slug)}
            >
              Study now
            </button>
          </div>
          <div className="image">
            <img src={UrlService.getImageUrl(item?.image)} alt="" />
          </div>
        </div>
      </SwiperSlide>
    );
  };
  // return component HighlightSlide
  return (
    <section className="home" id="home">
      <Swiper
        spaceBetween={150}
        speed={400}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ dynamicBullets: true, clickable: true }}
        className="home-slider"
        loop
        centeredSlides
      >
        {data.length > 0 ? data.map((item: any, index: number) => (renderSlide(item, index))) : ''}
      </Swiper>
    </section>
  );
}
