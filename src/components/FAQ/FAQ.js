import React from 'react';
import { Accordion } from 'react-bootstrap';

const FAQ = () => {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>How can I register on computer-parts-manufacturer.com</Accordion.Header>
        <Accordion.Body>
          You can register as our clients member by clicking Create a New account. Or Sign In Social Media.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Why does my account fail to log into computer-parts-manufacturer.com</Accordion.Header>
        <Accordion.Body>
          Check to see if the member id and password are accurate. It's important to remember that the password is case-sensitive. If you forget your password, you can reset it by clicking here.
          <br />
          Please check your spam folder if you haven't received an email within a few minutes. Please add computerpart@manufacturer.com to your email whitelist to avoid spam, and then click here to reset your password. If you have not received an email after that, please contact us directly.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>What should I do if I forget my email address?</Accordion.Header>
        <Accordion.Body>
          Please contact us, we will help you to find it.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default FAQ;