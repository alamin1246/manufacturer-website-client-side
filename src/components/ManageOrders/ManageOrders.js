import React from "react";
import { Table } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import axiosPrivate from "../../api/axiosPrivate";
import auth from "../firebase.init";
import useAllOrders from "../hooks/useAllOrders";
import useProducts from "../hooks/useProducts";
import Loading from "../Loading/Loading";

const ManageOrders = () => {
  const [authUser] = useAuthState(auth);

  const [reload, setReload] = React.useState(false);

  const [allOrders, setAllOrders, isLoading] = useAllOrders(reload);
  const [products, setProducts] = useProducts(reload);

  const handleDeliver = async (id, productName, requiredQuantity, quantity, isPaid) => {
    if (isPaid) {
      console.log(id);
      setReload(true);
      axiosPrivate
        .put(
          `http://localhost:5000/orders/${id}`,
          { isDelivered: true },
          {
            headers: {
              email: authUser.email,
            },
          }
        )
        .then(({ data }) => {
          if (data.modifiedCount) {
            console.log(data);
            const requiredProduct = products.find(
              (product) => product.productName === productName
            );
            console.log(requiredProduct.productName);
            const newProduct = {
              availableQuantity: (
                parseInt(requiredProduct.availableQuantity) -
                parseInt(requiredQuantity)
              ).toString(),
            };
            fetch(`http://localhost:5000/product/${requiredProduct._id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                email: `${authUser?.email}`,
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify(newProduct),
            })
              .then((response) => response.json())
              .then((json) => {
                console.log(json);
                setReload(false);
                toast.success("Order Delivered");
              });
          }
        });
    }
    else {
      toast.error("Order is not paid yet!");
    }
  };

  const reversedOrders = [...allOrders].reverse();

  const singleOrder = reversedOrders.map(
    (
      {
        _id,
        userName,
        userEmail,
        productName,
        productPrice,
        quantity,
        availableQuantity,
        totalPrice,
        isDelivered,
        requiredQuantity,
        isPaid,
        phoneNumber,
        address
      },
      index
    ) => {
      return (
        <tr key={_id}>
          <td className="text-center">
            <small>{index + 1}</small>
          </td>
          <td className="text-center">
            <small>{productName}</small>
          </td>
          <td className="text-center">
            <small>{quantity}</small>
          </td>
          <td className="text-center">
            <small>{totalPrice}</small>
          </td>

          <td className="text-center">
            <small>{userName}</small>
          </td>
          <td className="text-center">
            <small>{userEmail}</small>
          </td>
          <td className="text-center">
            <small>{address ? address : "Dhaka, Bangladesh"}</small>
          </td>
          <td className="text-center">
            <small>{
              phoneNumber ? phoneNumber : "01954059415"
            }</small>
          </td>

          <td className="text-center ">
            {isPaid ? (
              <small className="text-success">
                <strong>Paid</strong>
              </small>
            ) : (
              <small className="text-danger">
                <strong>Unpaid</strong>
              </small>
            )}
          </td>

          <td>
            {isDelivered ? (
              <p className="px-3 py-1 bg-success text-white rounded-pill">
                <small>
                  <strong>Shipped</strong>
                </small>
              </p>
            ) : (
              <button
                onClick={() =>
                  handleDeliver(
                    _id,
                    productName,
                    requiredQuantity,
                    quantity,
                    isPaid
                  )
                }
                className="btn btn-primary d-block mx-auto rounded-pill"
              >
                <small>Deliver</small>
              </button>
            )}
          </td>
        </tr>
      );
    }
  );
  return (
    <div>
      <h3 className="text-center text-success mb-4">Manage The Orders</h3>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="container">
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th className="text-center">No.</th>
                <th className="text-center">Product Name</th>
                <th className="text-center">Ordered Quantity</th>
                <th className="text-center">Total Price</th>
                <th className="text-center">User Name</th>
                <th className="text-center ">User Email</th>
                <th className="text-center">Address</th>
                <th className="text-center">Contact Number</th>
                <th className="text-center">Payment</th>
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>{singleOrder}</tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;