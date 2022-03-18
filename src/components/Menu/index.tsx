import React from 'react';
import Box from '../Box';

interface Props {
  name: string;
  heading: string;
  textButton: string;
  subHeading: string;
  data: any;
  render: Function | null;
}

export default function Menu({
  name,
  heading,
  textButton,
  subHeading,
  data,
  render,
} : Props) {
  return (
    <section className="menu" id={name}>

      <h3 className="sub-heading">
        {' '}
        {subHeading}
        {' '}
      </h3>
      <h1 className="heading">
        {' '}
        {heading}
        {' '}
      </h1>

      <div className={render ? 'box-container myCourse' : 'box-container'}>
        {
                typeof render === 'function' ? render(data)
                  : data.map((dataItem: any) => (
                    <Box
                      key={`box-${dataItem.id}`}
                      name={dataItem.name}
                      description={dataItem.description
                        && dataItem.description.length > 100
                        ? `${dataItem.description.substring(0, 100)}...`
                        : dataItem.description}
                      slug={dataItem.slug}
                      img={dataItem.image}
                      textButton={textButton}
                    />
                  ))
            }
      </div>
    </section>
  );
}
