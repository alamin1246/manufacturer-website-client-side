import React from 'react';
import { Card } from 'react-bootstrap';
import "./Portfolio.css"
import myProduct1 from "../../img/myProject1.JPG"
import myProduct2 from "../../img/myProject2.JPG"
import myProduct3 from "../../img/myProject3.JPG"

const Portfolio = () => {
  return (
    <div className="hero">
      <div className="content">
        <span className="title-name">MERN (MongoDB, Express.js, React.js, Node.js) Stack Developer</span>
        <h1 className="my-name">
          Hello, I’m <span className='text-primary'>Md. Al Amin Hossain</span>
        </h1>
        <p className="my-intro">
          I'd like to work for a software company as a MERN Stack Web Developer, where I can use my web design, front-end programming, and back-end development talents to give excellent customer service. I'd like to work for a software company as a MERN Stack Web Developer, where I can use my web design, front-end programming, and back-end development talents to give excellent customer service.
          <br />
          Looking for a position as a Junior Software Engineer at Limited, where my skills in developing
          clean code, testing, assuring separation of concerns, and designing for the specific needs of users
          will be valuable to the organization
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://drive.google.com/file/d/17k7BBD-WedOxeLFYy3hP7aam4NS_vu4d/view?usp=sharing"
          className="download-btn"
        >
          Download Curriculum Vitae
        </a>

        <div className="my-5">
          <h3 className="text-muted mb-3 my-project text-lg-start text-center text-primary">My Three Projects Given Here</h3>

          <div className="d-flex flex-lg-row flex-column  ">
            <Card className="project-card shadow me-0 me-lg-3 ">
              <Card.Body>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://vehicle-oil-product-analysis.netlify.app/"
                  class="project-link"
                >
                  <span className="d-flex justify-content-center">
                    <Card.Img
                      className="project-img p-2"
                      variant="top"
                      src={myProduct1}
                    />
                  </span>
                  <Card.Title className="text-center text-muted  my-0">
                    Vehicle Fuel Oil Product Analysis
                  </Card.Title>
                </a>
              </Card.Body>
            </Card>
            <Card className="project-card shadow me-0 me-lg-3">
              <Card.Body>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://alamins-home-food-catering-service.netlify.app/"
                  class="project-link"
                >
                  <span className="d-flex justify-content-center">
                    <Card.Img
                      className="project-img p-2"
                      variant="top"
                      src={myProduct2}
                    />
                  </span>
                  <Card.Title className="text-center text-muted my-0">
                    Al Amin's Home Food Catering Service
                  </Card.Title>
                </a>
              </Card.Body>
            </Card>
            <Card className="project-card shadow">
              <Card.Body>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://tangerine-figolla-1f58c9.netlify.app/"
                  class="project-link"
                >
                  <span className="d-flex justify-content-center">
                    <Card.Img
                      className="project-img p-2"
                      variant="top"
                      src={myProduct3}
                    />
                  </span>
                  <Card.Title className="text-center text-muted my-0">
                    Kids Toys Stock Management
                  </Card.Title>
                </a>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;