import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import auth from "../firebase.init";

const CheckoutForm = (props) => {
  const requiredOrder = props.requiredOrder;
  console.log(requiredOrder);
  const stripe = useStripe();
  const [transactionId, setTransactionId] = useState("");
  console.log(transactionId);
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [authUser] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fast-springs-48095.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: `${authUser?.email}`,
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        totalPrice: requiredOrder?.totalPrice,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [requiredOrder?.totalPrice, authUser?.email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast("Please wait...");

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }
    const { paymentIntent, error: paymentIntentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: requiredOrder?.userName,
            email: requiredOrder?.userEmail,
          },
        },
      });
    if (paymentIntentError) {
      console.log("[error]", paymentIntentError);
      setCardError(paymentIntentError.message);
      toast.error(paymentIntentError.message);
    } else {
      console.log("[PaymentIntent]", paymentIntent);
      setCardError("");
      setTransactionId(paymentIntent.id);
      toast.success("Payment Successful, THANK YOU!");
      props.onHide();
    }
  };

  useEffect(() => {
    if (transactionId) {
      fetch(`https://fast-springs-48095.herokuapp.com/orders/${requiredOrder?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          email: `${authUser?.email}`,
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          transactionId: transactionId,
          isPaid: true
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate("/dashboard/my-orders");
        });
    }
  }, [transactionId]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="d-flex justify-content-around">
          <button
            class="btn btn-danger d-block mx-auto mt-4 px-5 py-2"
            onClick={() => {
              props.onHide();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-success d-block mx-auto mt-4 px-5 py-2"
            disabled={!stripe || !clientSecret}
          >
            Confirm Payment
          </button>
        </div>
        <p className="text-danger mt-4">{cardError}</p>
      </form>
    </div>
  );
};

export default CheckoutForm;
