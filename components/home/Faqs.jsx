"use client";

import React, { useState } from "react";

import Chip_ins from "./Chip_ins";
import { ArrowUp, ChevronUp } from "lucide-react";
import GenerateSummary from "./GenerateSummary";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    {
      question: "What is the PDF to Summary feature?",
      answer:
        "The PDF to Summary feature allows users to upload any PDF document and receive a concise, AI-generated summary of the key points and insights.",
    },
    {
      question: "What types of PDFs are supported?",
      answer:
        "You can upload academic papers, reports, research articles, notes, and most standard PDFs that contain text. Scanned images or heavily encrypted PDFs may not work properly.",
    },
    {
      question: "Is my uploaded PDF stored or shared?",
      answer:
        "No. Your files are processed securely and are not stored on our servers. We prioritize user privacy and data protection.",
    },
    {
      question: "Can I edit or download the summary?",
      answer:
        "Yes. After the summary is generated, you can edit it in the browser and download it as a text or PDF file for your use.",
    },
    {
      question: "How long does it take to generate a summary?",
      answer:
        "It typically takes just a few seconds to a minute, depending on the length and complexity of the uploaded PDF.",
    },
    {
      question: "Is the summary 100% accurate?",
      answer:
        "While our AI aims to provide high-quality summaries, we recommend reviewing them for accuracy, especially for academic or professional use.",
    },
  ];

  return (
    <div className="w-full pt-24">
      <Chip_ins defination="FAQs" />
      <div className="max-w-3xl mx-auto flex  flex-col">
        <h3 className=" text-2xl lg:text-5xl font-medium text-center text-white">
          Smart Features Powered by AI
        </h3>
        <p className="text-purple-100/70 mb-5 text-sm md:text-base text-center mt-4 max-w-md px-8 lg:px-2 mx-auto font-medium">
          Effortless PDF interaction with intelligent tools for enhanced
          understanding, speed, and accessibility.
        </p>
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full py-10 flex justify-center items-center flex-wrap gap-4">
          {faqs.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className="p-2 border cursor-pointer rounded-[20px]"
                onClick={() => setActiveIndex(isActive ? null : index)}
              >
                <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-[700px] gap-5 rounded-xl shadow hover:shadow-2xl px-4 py-3 transition-all">
                  <div className="w-full flex justify-between items-center">
                    <h1 className="text-base sm:text-lg font-semibold text-left text-white">
                      {item.question}
                    </h1>
                    <div
                      className={`hover:rotate-180 duration-500 ${
                        isActive ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronUp />
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm sm:text-md text-purple-200/50 font-medium text-left py-2">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <GenerateSummary /> */}
    </div>
  );
};

export default Faqs;
