import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Pagination, Autoplay,
} from 'swiper';
import BoxReview from '../BoxReview';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Pagination, Autoplay]);
export default function Review({ data = [] }: any) {
  return (
    <section className="review" id="review">

      <h3 className="sub-heading"> customer&apos;s review </h3>
      <h1 className="heading"> what they say </h1>
      <Swiper
        spaceBetween={20}
        autoplay={{ delay: 3000 }}
        pagination={{ dynamicBullets: true, clickable: true }}
        className=""
        loop
        centeredSlides
        slidesPerView={3}
      >
        {data.map((dataItem: any) => (
          <SwiperSlide key={dataItem.id}>
            <BoxReview
              name={dataItem.name}
              reviewContent={dataItem.description}
              img={dataItem.img}
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}
