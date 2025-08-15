"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { getAuth, setUserAuth } from "@/lib/auth";

export default function PaymentResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId") || ""; // fallback to empty string
  const [status, setStatus] = useState("Processing payment...");

  useEffect(() => {
    if (!transactionId) {
      console.warn("transactionId is missing in URL");
      setStatus("❌ Invalid payment URL. Please try again.");
      return;
    }

    const apiBase = process.env.NEXT_PUBLIC_API_BASE;
    if (!apiBase) {
      console.error("NEXT_PUBLIC_API_BASE is missing!");
      setStatus("❌ Server configuration error.");
      return;
    }

    const processPayment = async () => {
      try {
        const { token } = getAuth();
        if (!token) {
          setStatus("❌ User not authenticated.");
          return;
        }

        const res = await axios.post(
          `${apiBase}/api/payment/callback`,
          { transactionId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Payment verification response:", res.data);

        if (res.data.success) {
          // ✅ Update local auth state
          setUserAuth({ token, hasPaid: true });
          setStatus("✅ Payment successful! Redirecting to listings...");

          // Redirect after 2 seconds
          setTimeout(() => {
            router.push("/listings");
          }, 2000);
        } else {
          setStatus("❌ Payment failed or cancelled.");
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        setStatus("❌ Error verifying payment. Please try again.");
      }
    };

    processPayment();
  }, [transactionId]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>{status}</h1>

      {status.includes("failed") || status.includes("Error") || status.includes("Invalid") ? (
        <button onClick={() => router.push("/checkout")}>Try Again</button>
      ) : null}
    </div>
  );
}
