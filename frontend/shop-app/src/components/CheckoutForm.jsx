import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// Załaduj Stripe (wstaw swój testowy klucz publiczny)
const stripePromise = loadStripe("pk_test_51QhA5WIB3emFVnXUXPx7Kxr1MEcDxzXmUWIBaQGlUr9x6HhaNYiQnRuvSuD1hlQ9IaGzH8TqaZjKqyCN86klHa8000nKIcGqot");

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // 1️⃣ Pobierz client_secret z backendu
    const response = await fetch("http://localhost:8200/api/payment/secure/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100, currency: "usd" }) // 1 USD = 100 centów
    });

    const { client_secret } = await response.json();

    // 2️⃣ Potwierdź płatność z użyciem client_secret
    const { paymentIntent, error } = await stripe.confirmCardPayment(client_secret, {
      payment_method: { card: elements.getElement(CardElement) }
    });

    if (error) {
      setMessage(`Payment failed: ${error.message}`);
    } else if (paymentIntent.status === "succeeded") {
      setMessage("Payment successful! 🎉");

      // 3️⃣ Zakończenie płatności (PUT request do backendu)
      await fetch("http://localhost:8200/api/payment/secure/payment-complete", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}` // Upewnij się, że token jest zapisany w localStorage
        }
      });
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Pay $1.00</h2>
      <CardElement options={{ hidePostalCode: true }} />
      <button type="submit" disabled={!stripe || isLoading} style={{ marginTop: "10px" }}>
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};
