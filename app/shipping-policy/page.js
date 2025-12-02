"use client";
import Chip_ins from "@/components/home/Chip_ins";
import React from "react";

const Page = () => {
  return (
    <div className="w-full pt-24 pb-12 px-4">
      <Chip_ins defination="Shipping Policy" />
      <div className="max-w-4xl mx-auto mt-8 text-white/80 space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">
          Shipping & Delivery Policy
        </h1>
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">1. Digital Delivery</h2>
          <p>
            PaperMind is a Software as a Service (SaaS) platform. All our services and products are delivered digitally. We do not ship any physical products.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">2. Delivery Timing</h2>
          <p>
            Upon successful payment, your account will be immediately upgraded, and you will receive instant access to the purchased plan features. A confirmation email will be sent to your registered email address.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">3. Issues with Access</h2>
          <p>
            If you do not receive access to the purchased features immediately after payment, please contact our support team at papermind@gmail.com with your transaction details. We will resolve the issue as soon as possible.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">4. Contact Us</h2>
          <p>
            For any questions regarding our shipping and delivery policy, please contact us at:
          </p>
          <div className="mt-2">
            <p><strong>Email:</strong> papermind@gmail.com</p>
            <p><strong>Address:</strong> NA</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
