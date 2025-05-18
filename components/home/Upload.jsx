"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import Chip_ins from "./Chip_ins";
import parsePDF from "@/actions/parse";
import { summaryGemini } from "@/actions/summary";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const handleFileUpload = (filesArray) => {
    const file = filesArray[0];

    if (!file || file.type !== "application/pdf")
      return alert("Please upload a PDF");

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      const res = await fetch("/api/upload-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64Pdf: base64 }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setFiles(data.url);
        const parser = await parsePDF(data.url);
        const summary = await summaryGemini(parser?.substring(0, 1000));

        console.log(parser, "parser y_____-----");

        console.log("++++++++<>");
        console.log(summary, "++++++++ summary_____-----");
      } else {
        alert("Upload failed");
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full pt-24">
      <Chip_ins defination="Upload" />
      <div className="max-w-3xl mx-auto flex  flex-col">
        <h3 className=" text-2xl lg:text-5xl font-medium text-center text-white">
          Upload your PDF to get started
        </h3>
        <p className="text-purple-100/70 mb-5 text-center mt-4 text-sm md:text-base max-w-md px-8 lg:px-2 mx-auto font-medium">
          Simply drag and drop or select a file — our AI will analyze,
          summarize, and let you chat with your document instantly.
        </p>
      </div>

      <div className="p-[1px] w-[90%] md:w-full max-w-full md:max-w-4xl mx-auto rounded-[28px] bg-gradient-to-r from-[#ffaa40] via-[#7702f5] to-[#ffaa40]">
        <div className="bg rounded-[27px] p-3 sm:p-4 md:p-6 overflow-hidden">
          <div className="w-full min-h-80 bg-transparent m-auto dark:border-neutral-800 rounded-lg backdrop-blur-sm">
            <FileUpload onChange={handleFileUpload} />
          </div>
        </div>
      </div>
      {files && <p>{files}</p>}
    </div>
  );
};

export default Upload;
