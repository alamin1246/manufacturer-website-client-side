import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Modal } from 'react-bootstrap';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
    "pk_test_51L2HmUA7LeGzA7bGJhxd4MgLa5RXkOX2LElzc5zkcOYgOYBatJaBZDXbNljUClH5U3nwpOIeksSjVEJe3UYIHjYF00qyLgNiIQ"
);
const PaymentModal = (props) => {
    console.log(props.requiredOrder);
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Elements stripe={stripePromise}>
                    <CheckoutForm requiredOrder={props?.requiredOrder} onHide={props.onHide} />
                </Elements>
            </Modal.Body>
            {/* <Modal.Footer>
          <Button
            className="btn btn-danger d-block mx-auto px-5"
            onClick={() => {
              props.onHide();
            }}
          >
            Cancel Restock
          </Button>
          <Button
            className="btn btn-success d-block mx-auto px-5"
            variant="primary"
          >
            Restock
          </Button>
        </Modal.Footer> */}
        </Modal>
    );
};



export default PaymentModal;