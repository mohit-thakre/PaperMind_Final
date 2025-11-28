"use client";
import Chip_ins from "@/components/home/Chip_ins";
import React from "react";

const Page = () => {
  return (
    <div className="w-full pt-24 pb-12 px-4">
      <Chip_ins defination="Refund Policy" />
      <div className="max-w-4xl mx-auto mt-8 text-white/80 space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">
          Refund & Cancellation Policy
        </h1>
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">1. Refund Policy</h2>
          <p>
            Thank you for purchasing our products at PaperMind.
          </p>
          <p className="mt-2">
            We have a strict no-refund policy. All purchases made on our website are final and non-refundable.
          </p>
          <p className="mt-2">
            Once a purchase is completed, you cannot return the product or receive a monetary refund. You must use the credits or services provided as part of your purchase. We do not offer refunds for any unused credits or partial subscription periods.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">2. Cancellation Policy</h2>
          <p>
            You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the end of the current paid term.
          </p>
          <p className="mt-2">
            If you have any additional questions or would like to request a refund, feel free to contact us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">3. Contact Us</h2>
          <p>
            If you have any questions about our Returns and Refunds Policy, please contact us:
          </p>
          <div className="mt-2">
            <p><strong>Email:</strong> papermind@gmail.com</p>
            <p><strong>Phone:</strong> NA</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
