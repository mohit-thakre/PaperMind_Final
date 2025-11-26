"use client";
import { Check, X } from "lucide-react";
import React, { useState } from "react";
import Chip_ins from "./Chip_ins";
import { useUserSync } from "@/hooks/useUserSync";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Script from "next/script";

const Plans = () => {
  const { dbUser, isSynced } = useUserSync();
  const { userId } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (planType, amount, credits) => {
    if (!userId) {
      toast.error("Please sign in to purchase");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create Razorpay order
      const res = await fetch("/api/purchase-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planType, amount, credits }),
      });

      const data = await res.json();
      console.log("Debug - Purchase response:", data);

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // // Step 2: Open Razorpay checkout
      // const options = {
      //   key: data.keyId,
      //   amount: data.amount,
      //   currency: data.currency,
      //   name: "PDF Summary App",
      //   description: `Purchase ${credits} Credits`,
      //   order_id: data.orderId,
      //   handler: async function (response) {
      //     // Step 3: Verify payment
      //     try {
      //       const verifyRes = await fetch("/api/verify-payment", {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify({
      //           razorpay_order_id: response.razorpay_order_id,
      //           razorpay_payment_id: response.razorpay_payment_id,
      //           razorpay_signature: response.razorpay_signature,
      //         }),
      //       });

      //       const verifyData = await verifyRes.json();

      //       if (verifyData.success) {
      //         toast.success(`🎉 ${verifyData.message}\nNew balance: ${verifyData.credits} credits`);
      //         // Refresh to show updated credits
      //         setTimeout(() => {
      //           window.location.reload();
      //         }, 1500);
      //       } else {
      //         toast.error("Payment verification failed. Please contact support.");
      //       }
      //     } catch (error) {
      //       console.error("Verification error:", error);
      //       toast.error("Payment verification failed. Please contact support.");
      //     } finally {
      //       setLoading(false);
      //     }
      //   },
      //   theme: {
      //     color: "#5a3ddb"
      //   },
      //   modal: {
      //     ondismiss: function() {
      //       setLoading(false);
      //       toast.info("Payment cancelled");
      //     }
      //   }
      // };

      // const rzp = new window.Razorpay(options);

      // // Handle payment failure
      // rzp.on("payment.failed", async function (response) {
      //   console.error("Payment failed:", response.error);
      //   toast.error(`Payment failed: ${response.error.description}`);
      //   setLoading(false);
      // });

      // rzp.open();

    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("An error occurred during purchase");
      setLoading(false);
    }
  };

  const pricingData = [
    {
      id: "plan_1",
      name: "Basic Plan",
      price: "₹1",
      description: "Perfect for trying out.",
      buttonText: "Purchase Now",
      buttonBg: "bg-[#5a3ddb] text-white",
      credits: 1,
      features: [
        { text: `${1} PDF upload & summary`, included: true },
        { text: "AI-powered summarization", included: true },
        { text: "One-time purchase", included: true },
        { text: "No expiration", included: true },
        { text: "Download summary as PDF", included: true },
        { text: "Priority support", included: false },
      ],
    },
    {
      id: "plan_2",
      name: "Standard Plan",
      price: "₹2",
      description: "Ideal for regular users.",
      buttonText: "Purchase Now",
      buttonBg: "bg-[#5a3ddb] text-white",
      credits: 2,
      features: [
        { text: `${2} PDF uploads & summaries`, included: true },
        { text: "AI-powered summarization", included: true },
        { text: "One-time purchase", included: true },
        { text: "No expiration", included: true },
        { text: "Download summaries as PDF", included: true },
        { text: "Priority support", included: false },
      ],
    },
    {
      id: "plan_3",
      name: "Premium Plan",
      price: "₹3",
      description: "Best value for power users.",
      buttonText: "Purchase Now",
      buttonBg: "bg-[#5a3ddb] text-white",
      credits: 3,
      features: [
        { text: `${3} PDF uploads & summaries`, included: true },
        { text: "AI-powered summarization", included: true },
        { text: "One-time purchase", included: true },
        { text: "No expiration", included: true },
        { text: "Download summaries as PDF", included: true },
        { text: "Priority support", included: true },
      ],
    },
  ];

  return (
    <div className="w-full pt-24">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Chip_ins defination="Pricing" />
      <div className="max-w-3xl mx-auto flex flex-col">
        <h3 className="text-2xl lg:text-5xl font-medium text-center text-white">
          Start summarizing today
        </h3>
        <p className="text-purple-100/70 mb-5 text-center mt-4 max-w-md text-sm md:text-base px-8 lg:px-2 mx-auto font-medium">
          Purchase credits to upload and generate PDF summaries. Each plan gives
          you credits that never expire - pay once, use anytime.
        </p>
        {isSynced && dbUser && (
          <p className="text-green-400 text-center mb-5 text-sm md:text-base px-8 lg:px-2 mx-auto font-medium">
            Your Credits: {dbUser.credits || 0}
          </p>
        )}
      </div>

      <div className="w-full py-6 flex flex-wrap justify-center items-center gap-5">
        {pricingData.map((plan, index) => (
          <div
            key={index}
            className="p-2 border-2 rounded-2xl border-gray-200"
            style={{ borderRadius: "20px" }}
          >
            <div
              className="relative h-[600px] w-[330px] overflow-hidden rounded-2xl p-6 shadow-lg transition-all hover:shadow-2xl"
              style={{ borderRadius: "12px" }}
            >
              <div className="flex flex-col items-center border-b border-gray-200 pb-6">
                <span className="mb-6 inline-block text-gray-500 font-medium">
                  {plan.name}
                </span>
                <span className="mb-3 inline-block text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-purple-100 text-sm">
                  {plan.description}
                </span>
              </div>

              <div className="space-y-4 py-9">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span
                      className={`grid size-6 place-content-center rounded-full text-sm font-medium ${
                        feature.included
                          ? "bg-[#5a3ddb] text-white"
                          : "bg-gray-300 text-gray-500"
                      }`}
                    >
                      {feature.included ? <Check size={14} /> : <X size={14} />}
                    </span>
                    <span className="text-sm text-gray-600">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  handlePurchase(
                    plan.id,
                    parseInt(plan.price.replace("₹", "")),
                    plan.credits
                  )
                }
                disabled={loading}
                className={`w-full rounded-lg px-5 py-3 text-lg font-medium cursor-pointer transition-all active:scale-95 hover:scale-105 duration-500 bg-[#5a3ddb] text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? "Processing..." : plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;