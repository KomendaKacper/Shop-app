import { useState, useContext, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import CartContext from "./CartContext";
import "../index.css";
import BackArrow from "../components/UI/BackArrow";
import { ToastContainer, toast } from "react-toastify";

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

  const notify = () => {
    console.log("Toast shown");
    toast.success("Payment successful! Redirecting...", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      theme: "light",
    });
  };

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const token = localStorage.getItem("token"); // Pobierz JWT
        if (!token) {
          console.error("Brak tokenu JWT w localStorage");
          return;
        }
  
        const response = await fetch(`http://localhost:8765/auth-service/api/csrf-token`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include", // Pozwól na przesyłanie ciasteczek
        });
  
        if (!response.ok) {
          throw new Error("Błąd pobierania CSRF tokenu");
        }
  
        const data = await response.json();
        if (data.token) {
          localStorage.setItem("csrfToken", data.token);
        }
      } catch (error) {
        console.error("CSRF Fetch Error:", error);
      }
    }
  
    fetchCsrfToken();
  }, []);
  

  async function checkout() {
    if (!stripe || !elements) {
      setHttpError("Stripe is not loaded");
      return;
    }
  
    const token = localStorage.getItem("token");
    const csrfToken = localStorage.getItem("csrfToken");
  
    if (!token) {
      setHttpError("Authorization error. You must be logged in.");
      return;
    }
  
    if (!csrfToken) {
      setHttpError("CSRF token missing. Try refreshing the page.");
      return;
    }
  
    setIsProcessing(true);
  
    const paymentInfo = {
      amount: totalPrice * 100,
      currency,
      email,
    };
  
    try {
      console.log("Bearer Token: ", token);
      console.log("X-XSRF-TOKEN: ", csrfToken);
  
      const stripeResponse = await fetch(
        `http://localhost:8765/orders-service/api/payment/secure/payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          credentials: "include",
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
        console.log(csrfToken);
        const response = await fetch(
          `http://localhost:8765/orders-service/api/payment/secure/payment-complete`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "X-XSRF-TOKEN": csrfToken,
            },
            credentials: "include",
            body: JSON.stringify(cartItems),
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("Błąd PUT:", errorResponse);
          throw new Error("PUT nie przeszedł!");
        }
        setHttpError(false);
        notify();
        cartCtx.removeAllItems();
        setTimeout(() => {
          navigate("/");
        }, 6000);
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
    <>
      <ToastContainer />
      <div className="m-6">
        <BackArrow />
      </div>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-slate-600 w-3/5 p-8 rounded-lg shadow-lg h-auto">
          <div className="flex justify-between border-b pb-4 mb-6">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl font-semibold">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <form className="space-y-6">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Joe"
                className="border p-3 w-1/2 rounded-md text-black"
              />
              <input
                type="text"
                placeholder="Doe"
                className="border p-3 w-1/2 rounded-md text-black"
              />
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
    </>
  );
};

export default PaymentPage;