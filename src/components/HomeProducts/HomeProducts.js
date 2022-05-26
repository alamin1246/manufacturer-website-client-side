import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import Loading from '../Loading/Loading';
import "./HomeProducts.css"

const HomeProducts = () => {
  const [products, setProducts, isLoading] = useProducts();


  const navigate = useNavigate();

  const slicedProducts = [...products].reverse().slice(0, 6);
  console.log(slicedProducts);


  const handleConfirmPurchase = (id) => {
    navigate(`/confirm-purchase/${id}`);
    window.scrollTo(0, 0);
  }


  const singleProduct = slicedProducts.map(
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
        <div className="col-md-4 sm:cols-sm-6 mb-4 tool-card">
          <Card
            className="shadow "
            style={{ width: "21rem", height: "600px" }}
          >
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
                  <strong>Price: Tk. {productPrice}</strong> (per item)
                </p>
                <small>
                  <strong className="text-muted">
                    Minimum Order Quantity: {minOrder}
                  </strong>
                </small>
                <div>
                  <small className="text-muted">
                    <strong>Available Quantity: {availableQuantity}</strong>
                  </small>
                </div>
              </Card.Text>

              <Button
                onClick={() => handleConfirmPurchase(_id)}
                className="d-block   confirm-order-button"
                variant="primary"
              >
                Confirm Purchase
              </Button>
            </Card.Body>
          </Card>
        </div>
      );
    }
  );
  return (
    <div >
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="row container mx-auto">
          {singleProduct}
        </div>
      )}
    </div>
  );
};

export default HomeProducts;