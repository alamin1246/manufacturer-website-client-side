import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../firebase.init";

const RestockModal = (props) => {
  const { products, restockId, setReloadModal } = props;
  console.log(products);
  console.log(restockId);


  const product = products.find((product) => product._id === restockId);
  console.log(product);
  const [quantity, setQuantity] = useState("");
  const [authUser] = useAuthState(auth);


  const updatedTool = {
    availableQuantity: (parseInt(product?.availableQuantity) + parseInt(quantity)).toString(),
  };

  const handleUpdateStock = (e) => {
    setReloadModal(true);
    fetch(`http://localhost:5000/product/${restockId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        email: `${authUser?.email}`,
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updatedTool),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        props.onHide();
        toast.success("Product Restocked Successfully");
        setReloadModal(false);
      });
  };

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
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="HP M32f FHD Monitor"
              value={product?.productName}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Available Stock</Form.Label>
            <Form.Control
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              type="number"
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-danger d-block mx-auto px-5"
          onClick={() => {
            props.onHide();
          }}
        >
          Cancel Restock
        </Button>
        <Button
          onClick={handleUpdateStock}
          className="btn btn-success d-block mx-auto px-5"
          variant="primary"
        >
          Restock
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RestockModal;
