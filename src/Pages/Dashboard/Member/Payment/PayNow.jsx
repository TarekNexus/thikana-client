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
import useMyAgreement from "../../../../Hooks/useMyAgreement";
import useAuth from "../../../../Hooks/useAuth";


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
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [adjustedAmount, setAdjustedAmount] = useState(agreement ? agreement.rent : 0);
  const [errorCoupon, setErrorCoupon] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  // Generate month options (unchanged)
  const generateMonthOptions = () => {
    const options = [];
    const today = new Date();

    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const value = date.toISOString().slice(0, 7);
      const label = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      options.push({ value, label });
    }
    return options;
  };

  const monthOptions = generateMonthOptions();

  const formatMonthLabel = (monthValue) => {
    if (!monthValue) return "";
    const [year, monthStr] = monthValue.split("-");
    const monthIndex = parseInt(monthStr, 10) - 1;
    return `${monthNames[monthIndex]} ${year}`;
  };

  // Recalculate adjusted amount whenever discount or original rent changes
  useEffect(() => {
    if (agreement) {
      const discountAmount = (agreement.rent * discountPercent) / 100;
      setAdjustedAmount(Math.round(agreement.rent - discountAmount));
    }
  }, [discountPercent, agreement]);

  // Create payment intent when adjustedAmount changes, user/email available, and month selected
  useEffect(() => {
    if (adjustedAmount > 0 && user?.email && month) {
      axios
        .post("https://thikana-server.vercel.app/create-payment-intent", {
          amount: adjustedAmount,
          email: user.email,
        })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => setClientSecret(""));
    }
  }, [adjustedAmount, user, month]);

  const handleApplyCoupon = async () => {
    setErrorCoupon("");
    if (!couponCode.trim()) {
      setErrorCoupon("Please enter a coupon code.");
      return;
    }
    try {
      // Fetch coupon from backend by code
      const res = await axios.get(`https://thikana-server.vercel.app/coupons?code=${couponCode.trim()}`);
      const coupons = res.data;
      if (!coupons || coupons.length === 0) {
        setErrorCoupon("Invalid coupon code.");
        setDiscountPercent(0);
        return;
      }
      // Assume first matched coupon
      const coupon = coupons[0];
      setDiscountPercent(coupon.discount);
      setErrorCoupon("");
      Swal.fire({
        icon: "success",
        title: "Coupon Applied",
        text: `You got ${coupon.discount}% off!`,
        confirmButtonColor: primaryColor,
      });
    } catch (err) {
      console.error(err);
      setErrorCoupon("Failed to verify coupon.");
      setDiscountPercent(0);
    }
  };

  // Save payment history with applied discount and amount
  const savePaymentHistory = async (paymentIntentId) => {
    try {
      const paymentData = {
        userEmail: user.email,
        amount: adjustedAmount,
        month: formatMonthLabel(month),
        paymentIntentId,
        apartmentNo: agreement.apartmentNo,
        blockName: agreement.blockName,
        floorNo: agreement.floorNo,
        paidAt: new Date(),
        couponCode: discountPercent > 0 ? couponCode.trim() : null,
        discountPercent: discountPercent > 0 ? discountPercent : null,
      };

      await axios.post("https://thikana-server.vercel.app/payments", paymentData);
      console.log("Payment history saved successfully.");
    } catch (error) {
      console.error("Failed to save payment history:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!month) {
      setErrorCoupon("Please select a month before payment.");
      return;
    }

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

      setMonth("");
      setCouponCode("");
      setDiscountPercent(0);
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

      {/* Month Select */}
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

      {/* Coupon Input & Button */}
      <div>
        <label
          htmlFor="couponCode"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Apply Coupon
        </label>
        <div className="flex gap-2">
          <input
            id="couponCode"
            type="text"
            placeholder="Enter coupon code"
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-0"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="bg-[#00aeff] text-white px-4 rounded-md font-semibold hover:bg-[#0099e6] transition"
          >
            Apply
          </button>
        </div>
        {errorCoupon && (
          <p className="text-red-600 mt-1 text-sm font-medium">{errorCoupon}</p>
        )}
      </div>

      {/* Card Details */}
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

      {/* Amount Summary */}
      <div className="text-center font-semibold text-lg">
        {discountPercent > 0 ? (
          <>
            Original Rent: <s>{agreement.rent} BDT</s> <br />
            Discount: {discountPercent}% <br />
            <span className="text-[#00aeff]">
              Payable Amount: {adjustedAmount} BDT
            </span>
          </>
        ) : (
          <>
            Amount to Pay: <span className="text-[#00aeff]">{adjustedAmount} BDT</span>
          </>
        )}
      </div>

      <button
        type="submit"
        disabled={!stripe || processing || !clientSecret || !month}
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
