// src/pages/Dashboard/PayNow.jsx
import React, { useEffect, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useMyAgreement from "../../../../Hooks/useMyAgreement";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
const primaryColor = "#00aeff";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const PayForm = () => {
  const { user } = useAuth();
  const { agreement, loading } = useMyAgreement();
  const [month, setMonth] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  // Generate next 12 months options for dropdown
  const generateMonthOptions = () => {
    const options = [];
    const today = new Date();

    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const value = date.toISOString().slice(0, 7); // YYYY-MM
      const label = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      options.push({ value, label });
    }
    return options;
  };

  const monthOptions = generateMonthOptions();

  // Format month value "YYYY-MM" to "MonthName Year" (e.g. "July 2025")
  const formatMonthLabel = (monthValue) => {
    if (!monthValue) return "";
    const [year, monthStr] = monthValue.split("-");
    const monthIndex = parseInt(monthStr, 10) - 1;
    return `${monthNames[monthIndex]} ${year}`;
  };

  useEffect(() => {
    if (agreement?.rent && user?.email) {
      axios
        .post("http://localhost:4000/create-payment-intent", {
          amount: agreement.rent,
          email: user.email,
        })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [agreement, user]);

  // Save payment history to backend
  const savePaymentHistory = async (paymentIntentId) => {
    try {
      const paymentData = {
        userEmail: user.email,
        amount: agreement.rent,
        month: formatMonthLabel(month), // Save month as readable string
        paymentIntentId,
        apartmentNo: agreement.apartmentNo,
        blockName: agreement.blockName,
        floorNo: agreement.floorNo,
        paidAt: new Date(),
      };

      await axios.post("http://localhost:4000/payments", paymentData);
      console.log("Payment history saved successfully.");
    } catch (error) {
      console.error("Failed to save payment history:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user.email,
          name: user.displayName,
        },
      },
    });

    if (result.error) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: result.error.message,
        confirmButtonColor: primaryColor,
      });
    } else if (result.paymentIntent.status === "succeeded") {
      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: "Thank you for your payment.",
        confirmButtonColor: primaryColor,
      });

      // Save payment history to DB
      await savePaymentHistory(result.paymentIntent.id);

      setMonth(""); // reset month select if you want
    }

    setProcessing(false);
  };

  if (loading || !agreement)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-12 space-y-6"
      style={{ border: `2px solid ${primaryColor}` }}
    >
      <h2
        className="text-2xl font-bold text-center"
        style={{ color: primaryColor }}
      >
        Pay Your Rent
      </h2>

      <div>
        <label
          htmlFor="month"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Select Month
        </label>
        <select
          id="month"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-0"
          required
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ borderColor: primaryColor }}
        >
          <option value="" disabled>
            Select Month
          </option>
          {monthOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="card-element"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Card Details
        </label>
        <div
          id="card-element"
          className="border border-gray-300 rounded-md p-3"
          style={{ borderColor: primaryColor }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#000",
                  "::placeholder": { color: "#888" },
                  fontWeight: "500",
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
          />
        </div>
      </div>

      <button
  type="submit"
  disabled={!stripe || processing || !clientSecret}
  className="w-full py-3 rounded-md text-white font-semibold transition-colors duration-200"
  style={{
    backgroundColor: primaryColor,
  }}
  onMouseEnter={(e) => {
    if (!processing) e.target.style.backgroundColor = "#0096e6";
  }}
  onMouseLeave={(e) => {
    if (!processing) e.target.style.backgroundColor = primaryColor;
  }}
>
  {processing ? "Processing..." : "Pay"}
</button>
    </form>
  );
};

const PayNow = () => (
  <Elements stripe={stripePromise}>
    <PayForm />
  </Elements>
);

export default PayNow;
