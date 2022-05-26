import React from "react";
import "./Home.css"
import Banner from "../Banner/Banner";
import Summary from "../Summary/Summary";
import {
  faPeopleGroup,
  faStar,
  faEarthAmerica,
} from "@fortawesome/free-solid-svg-icons";
import FAQ from "../FAQ/FAQ";
import Subscribe from "../Subscribe/Subscribe";
import HomeProducts from "../HomeProducts/HomeProducts";
import Reviews from "../Swiper/Reviews";

const Home = () => {
  return (
    <div className="home-container">
      <Banner></Banner>
      <div className="my-5">
        <h1 className="text-center text-primary mb-5">Our Computer Parts Manufacturer Products</h1>
        <HomeProducts></HomeProducts>
      </div>
      <div>
        <h2 className='text-primary text-center'>Computer Parts Manufacturer Summery</h2>
      </div>
      <div className="d-flex flex-lg-row flex-column  justify-content-evenly my-3 bg-primary py-5">
        <div>
          <Summary
            icon={faEarthAmerica}
            header="+ Countries"
            number={35}
          ></Summary>
        </div>
        <div className="my-5 my-lg-0">
          <Summary
            icon={faPeopleGroup}
            header="+ Satisfaction Clients"
            number={100}
          ></Summary>
        </div>
        <div>
          <Summary icon={faStar} header="+ Clients Feedback" number={120}></Summary>
        </div>
      </div>

      <div className="my-5 ">
        <h1 className="text-center text-primary mb-5">
          Our Satisfaction Client Says
        </h1>
        <Reviews></Reviews>
      </div>

      <div className="my-5 container">
        <h1 className="text-center text-primary mb-4 ">
          Computer Parts Manufacturer FAQ
        </h1>
        <FAQ></FAQ>
      </div>

      <div className="my-5 container">
        <h1 className="text-center text-primary mb-4">Contact With Us</h1>
        <Subscribe></Subscribe>
      </div>
    </div>
  );
};

export default Home;
