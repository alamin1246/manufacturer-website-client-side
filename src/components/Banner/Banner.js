import React from 'react';
import "./Banner.css"
import computerParts from '../../img/computerParts.jpg';

const Banner = () => {
  return (
    <div className="d-flex flex-column-reverse flex-lg-row align-items-center justify-content-between container mx-auto">
      <div className="banner-info">

        <h1 className='text-primary'>
          THE MISSION AND THE VISION
        </h1>
        <h4 className='text-muted'>
          Our mission
        </h4>
        <p>To establish and maintain a leadership position in the rapidly growing ICT industry by providing computer parts manufacturer products  that enable our customers to compete effectively using cutting-edge technology.</p>
        <h4 className='text-muted'>
          Our Vision
        </h4>
        <p>Computer parts manufacturer is working hard to establish itself as a highly reputable and productive Computer parts manufacturer provider with a strong commitment to customer.</p>
        <button className="btn btn-primary my-2 d-lg-inline d-block mx-lg-0 mx-auto">More Info</button>
      </div>
      <div className="d-flex justify-content-center">
        <img
          className="w-75"
          src={computerParts}
          alt="banner"
        />
      </div>
    </div>
  );
};

export default Banner;