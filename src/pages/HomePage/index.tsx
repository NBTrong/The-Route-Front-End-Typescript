import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import HighlightSlide from '../../components/HighlightSlide';
import Menu from '../../components/Menu';
import Review from '../../components/Review';
import Box from '../../components/Box';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import HomePageApi from '../../services/HomePageApi';

SwiperCore.use([Pagination]);
const pp = [
  {
    name: 'Thầy Phương',
    description: 'Web quá hay, 10 điểm về chỗ',
    img: './images/troll-1.jpg',
  },

  {
    name: 'Đỗ Nam Trung',
    description: 'Tôi đang note nội dung họp NATO bằng web này',
    img: './images/troll-3.jfif',
  },

  {
    name: 'Ronaldo',
    description: 'Rất mong admin làm chức năng kiếm thêm 2 quả bóng vàng',
    img: './images/troll-5.jfif',
  },

  {
    name: 'Fo Lo Ti Nô',
    description: 'Quá ghê gớm, và đây là Fo lo ti nô',
    img: './images/troll-4.jfif',
  },
];

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
      // const review = await HomePageApi.getHomePage('review');
      setHighlights(highlightRes.data.data);
      setMenu(menuRes.data.data);
      setMyCourse(myCourseRes.data.data);
      // setReviews(review);
    } catch (error) {
      // console.log(error);
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
      <Review key="3" data={pp} />
    </div>
  );
}
export default HomePage;
