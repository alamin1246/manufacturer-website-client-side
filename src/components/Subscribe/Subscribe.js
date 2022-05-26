import React from 'react';
import { Form } from 'react-bootstrap';
import "./Subscribe.css"

const Subscribe = () => {
  return (
    <div className="d-flex flex-column flex-lg-row  justify-content-around align-items-center">
      <div className="subscribe-form">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter Your Email Address" />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Feedback</Form.Label>
            <Form.Control as="textarea" placeholder="Enter Your Feedback" rows={3} />
            <div>
              <button className="btn btn-primary d-block mx-auto my-4">Submit</button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Subscribe;