import { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import '../index.css';

export const PaymentPage = () => {
  const [httpError, setHttpError] = useState(false);
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("USD");

  const stripe = useStripe();

  async function checkout() {
    if (!stripe) {
      return;
    }

    let paymentInfo = new PaymentInfoRequest(price * 100, currency, email);

    const url = `https://localhost:8200/api/payment/secure/payment-intent`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentInfo),
    };
    const stripeResponse = await fetch(url, requestOptions);
    if (!stripeResponse.ok) {
      setHttpError("Error processing payment");
      return new Error("Error processing payment");
    }
    const stripeResponseJson = await stripeResponse.json();

    stripe
      .confirmCardPayment(
        stripeResponseJson.clientSecret,
        {
          payment_method: {
            card: ElementInternals.getElement(CardElement),
            billing_details: {
              email: email,
            },
          },
        },
        { handleActions: false }
      )
      .then(async function (result) {
        if (result.error) {
          setHttpError(result.error.message);
        } else {
          const url = `https://localhost:8200/api/payment/secure/payment-complete`;
          const requestOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const stripeResponse = await fetch(url, requestOptions);
          if (!stripeResponse.ok) {
            setHttpError("Error processing payment");
            return new Error("Error processing payment");
          }
          setPrice(0);
        }
      });
    setHttpError(false);
  }

  if (httpError) {
    return <p>{httpError}</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-slate-600 w-3/5 p-8 rounded-lg shadow-lg h-auto">
        <div className="flex justify-between border-b pb-4 mb-6">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-xl font-semibold">${price}</span>
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

          <div className="flex space-x-4">
            <input
              type="number"
              min={0}
              step={1}
              placeholder="Card Number"
              className="border p-3 w-3/4 rounded-md text-black appearance-none no-spin"
            />
            <input
              type="password"
              placeholder="CVC"
              className="border p-3 ml-auto w-1/4 rounded- text-black"
              maxLength={3}
            />
          </div>

          <div className=" flex justify-end ml-auto">
            <input
              type="month"
              placeholder="MM/YYYY"
              className="border p-3 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
