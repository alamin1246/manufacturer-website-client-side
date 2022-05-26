import React from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../firebase.init";
import "./AddProduct.css";
import { useForm } from "react-hook-form";
import useProducts from "../hooks/useProducts";

const AddProduct = () => {

  const [products, setProducts, isLoading] = useProducts();
  console.log(products);



  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // const handleAddProduct = (e) => {
  //   e.preventDefault();
  // };

  const [authUser] = useAuthState(auth);

  //imgBB post API
  //https://api.imgbb.com/1/upload?key=process.env.IMGBB_API_KEY

  const onSubmit = async (data) => {
    console.log(products.find((product) => product.productName === data.productName));
    const alreadyExist = products.find((product) => product.productName === data.productName);
    if (!alreadyExist) {
      const image = data.productImage[0];
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=91a25467b20a9debe14fa8cbbc3a4a74`;
      console.log(url);
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            console.log(result);
            const img = result.data.url;
            const product = {
              productName: data.productName,
              productImage: img,
              productPrice: data.productPrice,
              minOrder: data.minOrder,
              availableQuantity: data.availableQuantity,
              productDescription: data.productDescription,
            };
            fetch("http://localhost:5000/product", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                email: authUser?.email,
              },
              body: JSON.stringify(product),
            })
              .then((res) => res.json())
              .then((inserted) => {
                console.log(inserted);
                if (inserted._id) {
                  toast.success("Product added successfully");
                  reset();
                } else {
                  toast.error("Failed to add the Product");
                }
              });
          }
        });
    }
    else {
      toast.error("Product already exist");
    }
  };

  return (
    <div>
      <h3 className="text-center text-success mb-4">
        Add A Product In Our Database
      </h3>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="add-product-form mx-auto mb-5"
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            {...register("productName", {
              required: {
                value: true,
                message: "Product Price is Required",
              },
            })}
            type="text"
            placeholder="Wrench"
          />
          <p>
            {errors?.productName?.type === "required" && (
              <span className="text-danger">{errors.productName.message}</span>
            )}
          </p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            {...register("productPrice", {
              required: {
                value: true,
                message: "Product Price is Required",
              },
            })}
            type="number"
            placeholder="Tk."
          />
          <p>
            {errors?.toolPrice?.type === "required" && (
              <span className="text-danger">{errors.toolPrice.message}</span>
            )}
          </p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Minimum Order</Form.Label>
          <Form.Control
            {...register("minOrder", {
              required: {
                value: true,
                message: "Minimum Order Quantity is Required",
              },
            })}
            type="number"
            placeholder="150"
          />
          <p>
            {errors?.minOrder?.type === "required" && (
              <span className="text-danger">{errors.minOrder.message}</span>
            )}
          </p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Available Quantity</Form.Label>
          <Form.Control
            {...register("availableQuantity", {
              required: {
                value: true,
                message: "Available quantity is Required",
              },
            })}
            type="number"
            placeholder="1500"
          />
          <p>
            {errors?.availableQuantity?.type === "required" && (
              <span className="text-danger">
                {errors.availableQuantity.message}
              </span>
            )}
          </p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            {...register("productImage", {
              required: {
                value: true,
                message: "Product Image is Required",
              },
            })}
            type="file"
            placeholder="1000"
          />
          <p>
            {errors?.productImage?.type === "required" && (
              <span className="text-danger">{errors.productImage.message}</span>
            )}
          </p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            {...register("productDescription", {
              minLength: {
                value: 100,
                message: "Minimum 100 character required",
              },
              maxLength: {
                value: 200,
                message: "Maximum 200 character required",
              },
              required: {
                value: true,
                message: "Product Description is Required",
              },
            })}
            as="textarea"
            rows={3}
          />
          <p className="mt-3">
            {(errors?.productDescription?.type === "required" ||
              errors?.productDescription?.type === "maxLength" ||
              errors?.productDescription?.type === "minLength") && (
                <span className="text-danger">
                  {errors?.productDescription?.message}
                </span>
              )}
          </p>
        </Form.Group>
        <Button
          type="submit"
          className="px-4 d-block mx-auto"
          variant="primary"
        >
          Add This Product
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
