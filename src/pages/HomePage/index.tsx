import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import HighlightSlide from '../../components/HighlightSlide';
import Menu from '../../components/Menu';
import Box from '../../components/Box';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import HomePageApi from '../../services/HomePageApi';

SwiperCore.use([Pagination]);

function HomePage() {
  // const [reviews, setReviews] = useState([] as any);
  const [highlights, setHighlights] = useState([] as any);
  const [menu, setMenu] = useState([] as any);
  const [myCourse, setMyCourse] = useState([] as any);

  const getData = async () => {
    try {
      const highlightRes = await HomePageApi.getHomePage('highlight');
      const menuRes = await HomePageApi.getHomePage('menu');
      const myCourseRes = await HomePageApi.getHomePage('myMenu');
      setHighlights(highlightRes.data.data);
      setMenu(menuRes.data.data);
      setMyCourse(myCourseRes.data.data);
    } catch (error) {
      // TODO: handle error
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Custom children Component Menu
  const renderMyCourse = (data: any) => (
    <Swiper key="renderMyCourse" slidesPerView={3} spaceBetween={25} className="myCourse-swiper">
      {data.map((dataItem: any) => (
        <SwiperSlide key={`myCourse-${dataItem.id}`}>
          <Box
            key={`box-${dataItem.id}`}
            name={dataItem.name}
            description={dataItem.description
              && dataItem.description.length > 100
              ? `${dataItem.description.substring(0, 100)}...`
              : dataItem.description}
            slug={dataItem.slug}
            img={dataItem.image}
            textButton="Keep studying"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
  return (
    <div id="HomePage">
      <HighlightSlide data={highlights} />
      <Menu
        key="1"
        name="menu"
        data={menu}
        subHeading="Menu"
        heading="All courses"
        textButton="View"
        render={null}
      />
      <Menu
        key="2"
        name="mycourse"
        data={myCourse}
        subHeading="Menu"
        render={renderMyCourse}
        heading="studying"
        textButton="View"
      />
    </div>
  );
}
export default HomePage;
