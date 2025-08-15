// components/PhonePePayment.jsx
"use client";
import { useState } from "react";

export default function PhonePePayment({ amount }) {
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/payment/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }), // paise: ₹100 = 10000
      });

      const data = await res.json();

      if (data?.data?.instrumentResponse?.redirectInfo?.url) {
        // Redirect to PhonePe payment page
        window.location.href = data.data.instrumentResponse.redirectInfo.url;
      } else {
        alert("Payment initiation failed");
        console.error("Unexpected PhonePe response:", data);
      }
    } catch (err) {
      console.error("PhonePe payment error:", err);
      alert("Something went wrong starting payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={startPayment}
      disabled={loading}
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
    >
      {loading ? "Processing..." : "Pay with PhonePe"}
    </button>
  );
}
