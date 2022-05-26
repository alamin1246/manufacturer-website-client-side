import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import useProducts from '../hooks/useProducts';
import Loading from '../Loading/Loading';


const AllProducts = () => {
  const [products, setProducts, isLoading] = useProducts();
  const [authUser] = useAuthState(auth);

  const navigate = useNavigate();

  const reversedProducts = [...products].reverse();

  const [admin, setAdmin] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(
      `https://fast-springs-48095.herokuapp.com/admin/${authUser?.email}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          email: `${authUser?.email}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAdmin(data);
      });

    fetch(`https://fast-springs-48095.herokuapp.com/user/${authUser?.email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        email: `${authUser?.email}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      });
  }, [authUser?.email]);

  const handleConfirmPurchase = (id) => {
    navigate(`/confirm-purchase/${id}`);
    window.scrollTo(0, 0);
  };

  const singleProduct = reversedProducts.map(
    ({
      _id,
      productName,
      productImage,
      productPrice,
      minOrder,
      availableQuantity,
      productDescription,
    }) => {
      return (
        <div className="col-md-4 col-sm-6 mb-4 tool-card">
          <Card className="shadow " style={{ height: "490px" }}>
            <Card.Img className="tool-img" variant="top" src={productImage} />
            <Card.Body>
              <Card.Title className="text-center  tool-header">
                {productName}
              </Card.Title>
              <Card.Text className="tool-body">
                <p className="text-muted">
                  {productDescription.slice(0, 60)}...
                </p>
                <p className="mb-2">
                  <strong>Price: Tk. {productPrice}</strong> (Per Item)
                </p>
                <small>
                  <strong className="text-muted">
                    Minimum Order Quantity: {minOrder}
                  </strong>
                </small>
                <div>
                  {parseInt(availableQuantity) === 0 ? (
                    <small className="text-danger">
                      <strong>Out Of the stocks</strong>
                    </small>
                  ) : (
                    <small className="text-muted">
                      <strong>Available Quantity of Product: {availableQuantity}</strong>
                    </small>
                  )}
                </div>
              </Card.Text>

              {(user?.role === "user" &&
                admin?.role !==
                "admin") || !authUser ? (
                <Button
                  onClick={() => handleConfirmPurchase(_id)}
                  className="d-block   confirm-order-button"
                  variant="success"
                >
                  Confirm Purchase
                </Button>
              )
                :
                null}
            </Card.Body>
          </Card>
        </div>
      );
    }
  );

  return (
    <div className="my-5">
      <div>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="row container mx-auto ">{singleProduct}</div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;