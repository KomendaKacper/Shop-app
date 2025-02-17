import { useEffect } from "react";

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
};
