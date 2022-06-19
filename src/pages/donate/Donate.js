// import PurchaseConfirm from 'PurchaseConfirm'

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements  } from "@stripe/react-stripe-js";
import DonateForm from "../../components/donate/Donateform";
import { useUser } from "reactfire";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51LAQTdJvxpEoTgBTXkO5dniQxEm0DKR3jbFG9vj2dlzYn2B9PdMcNH58FLktu3m2z62TDXg8xGqDxw4p0UmKYs1d00vuEzqDIN");

const Donate = () => {

  const [clientSecret, setClientSecret] = useState("");
  const {data: user} = useUser()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://127.0.0.1:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 'user': user, items: [{ id: "good coder funding" }] }),
    })
      .then((res) => {console.log(res); return res.json()})
      .then((data) => setClientSecret(data['clientSecret']));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
      <div className="donate">
      <h1>Prove you believe in me...</h1>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <DonateForm />
          </Elements>
        )}
      </div>
  )
}
export default Donate