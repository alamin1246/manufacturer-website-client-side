import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../firebase.init";
import useProducts from "../hooks/useProducts";
import Loading from "../Loading/Loading";
import DeleteModal from "./DeleteModal";
import RestockModal from "./RestockModal";

const ManageProduct = () => {
  const [reload, setReload] = useState(false);
  const [boolean, setBoolean] = React.useState(false);
  const [reloadModal, setReloadModal] = React.useState(false);
  const [proceed, setProceed] = React.useState(false);
  const [modalShowDelete, setModalShowDelete] = React.useState(false);
  const [modalShowRestock, setModalShowRestock] = React.useState(false);
  const [deleteOrderId, setDeleteOrderId] = React.useState("");
  const [restockId, setRestockId] = React.useState("");

  console.log(reload);
  const [products, setProducts, isLoading] = useProducts(reload, reloadModal);
  const [authUser] = useAuthState(auth);

  const handleDeleteProduct = (id) => {
    console.log(id);
    setModalShowDelete(true);
    setDeleteOrderId(id);
  };

  const handleRestockProduct = (id) => {
    console.log(id);
    setModalShowRestock(true);
    setRestockId(id);
  }

  useEffect(() => {
    console.log("data deleted");
    if (proceed) {
      setReload(true);
      fetch(`https://fast-springs-48095.herokuapp.com/product/${deleteOrderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          email: `${authUser?.email}`,
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setReload(false);
          console.log(json);
          toast.success("Product Deleted Successfully");
        });
      setDeleteOrderId("");
      setProceed(false);
    }
  }, [proceed, deleteOrderId, boolean, authUser?.email]);

  const singleProducts = products.map(
    ({ _id, productName, productPrice, availableQuantity }, index) => {
      return (
        <tr>
          <td className="text-center">{index + 1}</td>
          <td className="text-center">{productName}</td>
          <td className="text-center"> {productPrice}</td>

          <td className="text-center">{availableQuantity}</td>
          <td>
            <button
              onClick={() => handleRestockProduct(_id)}
              className="btn btn-success d-block mx-auto"
            >
              Restock
            </button>
          </td>
          <td>
            <button
              onClick={() => handleDeleteProduct(_id)}
              className="btn btn-danger d-block mx-auto"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
  );

  return (
    <div>
      <h3 className="text-center text-success mb-4">Manage Products</h3>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="container">
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th className="text-center">No.</th>
                <th className="text-center">Product Name</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center"></th>
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>{singleProducts}</tbody>
          </Table>
        </div>
      )}
      <DeleteModal
        show={modalShowDelete}
        setProceed={setProceed}
        setBoolean={setBoolean}
        boolean={boolean}
        onHide={() => {
          setModalShowDelete(false);
        }}
      ></DeleteModal>
      <RestockModal
        products={products}
        restockId={restockId}
        show={modalShowRestock}
        setReloadModal={setReloadModal}
        onHide={() => {
          setModalShowRestock(false);
        }}
      ></RestockModal>
    </div>
  );
};

export default ManageProduct;
