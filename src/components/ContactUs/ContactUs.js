import React from "react";
import "./ContactUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone
} from "@fortawesome/free-solid-svg-icons";

const ContactUs = () => {
  return (
    <div>
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center about-me-title">
          <h1>Contact Us</h1>
        </div>
        <div className="d-flex flex-lg-row flex-column justify-content-around align-items-center mt-4">
          <div className="leaflet-texts">
            <h5>
              <FontAwesomeIcon className="me-2" icon={faLocationDot} /> East Hazi Nagar,Sarulia, Demra, Dhaka-1361
            </h5>

            <h5 className="mb-lg-0 mb-5">
              <FontAwesomeIcon className="me-2" icon={faPhone} /> Helpline :
              01536183424
            </h5>
            <h5 className="mb-lg-0 mb-7">
              <FontAwesomeIcon className="me-2" /> Email :
              computerparts@manufacturer.com
            </h5>
          </div>

        </div>
      </div>
      <div>
        <div>
          <div className="d-flex justify-content-center align-items-center about-me-title mt-lg-4">
            <h1>Our Mission</h1>
          </div>
          <div className="d-flex flex-lg-row flex-column-reverse justify-content-center align-items-center container  about-me-container mt-4">
            <div className="about-me-text-container mx-auto mt-lg-0 my-lg-0 my-5">
              <p>
                We are a well-known computer component manufacturer. We control 80 percent of the market. Which computer parts we sell and where they go are very important to us. As a result, we are not exposed to the European economy. You must, however, be present if you wish to grow a European company and sell into Europe. When I examine the results for Europe, I notice that they are experiencing issues. They have solid OEM growth, but channel growth is difficult to come by, and there isn't much in that channel since you don't have a very big variety, if I may say so.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
