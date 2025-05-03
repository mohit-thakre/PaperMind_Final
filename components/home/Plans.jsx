import { Check, X } from "lucide-react";
import React from "react";
import Chip_ins from "./Chip_ins";

const Plans = () => {
  const pricingData = [
    {
      name: "Pro Plan",
      price: "₹299/month",
      description: "Ideal for frequent users.",
      buttonText: "Upgrade Now",
      buttonBg: "bg-[#5a3ddb] text-white",
      features: [
        { text: "Unlimited PDF uploads", included: true },
        { text: "Advanced summarization", included: true },
        { text: "Full chat with PDF access", included: true },
        { text: "Multiple language support", included: true },
        { text: "Export summaries (PDF/Doc)", included: true },
        { text: "Priority support", included: false },
      ],
    },
    {
      name: "Free Plan",
      price: "₹0/month",
      description: "Perfect for getting started.",
      buttonText: "Get Started",
      buttonBg: "bg-gray-200 text-gray-600",
      features: [
        { text: "5 PDF uploads/month", included: true },
        { text: "Basic summarization", included: true },
        { text: "Chat with PDF (Limited)", included: true },
        { text: "Multiple language support", included: false },
        { text: "Export summaries", included: false },
        { text: "Priority support", included: false },
      ],
    },
    {
      name: "Enterprise Plan",
      price: "₹999/month",
      description: "Best for teams and professionals.",
      buttonText: "Contact Sales",
      buttonBg: "bg-[#5a3ddb] text-white",
      features: [
        { text: "Unlimited uploads", included: true },
        { text: "AI-powered deep summary", included: true },
        { text: "Team collaboration tools", included: true },
        { text: "Multi-language + OCR", included: true },
        { text: "Downloadable reports", included: true },
        { text: "Priority support", included: true },
      ],
    },
  ];

  return (
    <div className="w-full pt-24">
      <Chip_ins defination="Pricing" />
      <div className="max-w-3xl mx-auto flex  flex-col">
        <h3 className=" text-2xl lg:text-5xl font-medium text-center text-white">
          Start summarizing today
        </h3>
        <p className="text-purple-100/70 mb-5 text-center mt-4 max-w-md px-8 lg:px-2 mx-auto font-medium">
          Start transforming your PDFs into summaries and conversations. Select
          the plan that fits your needs.
        </p>
      </div>

      <div className="w-full py-6 flex flex-row justify-center items-center gap-5">
        {pricingData.map((plan, index) => (
          <div
            key={index}
            className=" p-2 border-2 rounded-2xl border-gray-200"
            style={{ borderRadius: "20px" }}
          >
            <div
              key={index}
              className="relative h-[600px] w-[330px] overflow-hidden rounded-2xl    p-6 shadow-lg transition-all hover:shadow-2xl"
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
                className={`w-full rounded-lg px-5 py-3 text-lg font-medium cursor-pointer  transition-all active:scale-95 ${plan.buttonBg}`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
