"use client";
export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { getAuth, setUserAuth } from "@/lib/auth";

function PaymentResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId") || "";
  const [status, setStatus] = useState("Processing payment...");

  useEffect(() => {
    if (!transactionId) {
      setStatus("❌ Invalid payment URL. Please try again.");
      return;
    }

    const apiBase = process.env.NEXT_PUBLIC_API_BASE;
    if (!apiBase) {
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

        if (res.data.success) {
          setUserAuth({ token, hasPaid: true });
          setStatus("✅ Payment successful! Redirecting to listings...");
          setTimeout(() => router.push("/listings"), 2000);
        } else {
          setStatus("❌ Payment failed or cancelled.");
        }
      } catch (err) {
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

export default function PaymentResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentResultContent />
    </Suspense>
  );
}
