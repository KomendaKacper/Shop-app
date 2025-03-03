import { useState, useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import CartContext from "./CartContext";
import "../index.css";

// 4242 4242 4242 4242
// 07/26
//  559

export const PaymentPage = () => {
  const cartCtx = useContext(CartContext);
  const cartItems = cartCtx.items;

  const location = useLocation();
  const navigate = useNavigate();
  const totalPrice = location.state?.totalPrice || 0;

  const [httpError, setHttpError] = useState(false);
  const [currency] = useState("USD");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  async function checkout() {
    if (!stripe || !elements) {
      setHttpError("Stripe is not loaded");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setHttpError("Authorization error. You must be logged in.");
      return;
    }

    setIsProcessing(true);

    const paymentInfo = {
      amount: totalPrice * 100,
      currency,
      email,
    };

    try {
      const stripeResponse = await fetch(
        `http://localhost:8765/orders-service/api/payment/secure/payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(paymentInfo),
        }
      );

      if (!stripeResponse.ok) {
        throw new Error("Error processing payment");
      }

      const stripeResponseJson = await stripeResponse.json();
      const result = await stripe.confirmCardPayment(
        stripeResponseJson.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: { email },
          },
        }
      );

      if (result.error) {
        setHttpError(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        const response = await fetch(
          `http://localhost:8765/orders-service/api/payment/secure/payment-complete`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cartItems),
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("Błąd PUT:", errorResponse);
          throw new Error("PUT nie przeszedł!");
        }

        setHttpError(false);
        navigate("/");
      } else {
        setHttpError("Payment failed. Please try again.");
      }
    } catch (error) {
      setHttpError(error.message);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-slate-600 w-3/5 p-8 rounded-lg shadow-lg h-auto">
        <div className="flex justify-between border-b pb-4 mb-6">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-xl font-semibold">${totalPrice.toFixed(2)}</span>
        </div>

        <form className="space-y-6">
          <div className="flex space-x-4">
            <input type="text" placeholder="Joe" className="border p-3 w-1/2 rounded-md text-black" />
            <input type="text" placeholder="Doe" className="border p-3 w-1/2 rounded-md text-black" />
          </div>
          <div className="flex">
            <input
              type="email"
              placeholder="JoeDoe@mail.com"
              className="border p-3 w-full rounded-md text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <CardElement className="border p-3 rounded-md bg-white" />
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            onClick={checkout}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
