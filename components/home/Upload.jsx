"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import Chip_ins from "./Chip_ins";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const handleFileUpload = (files) => {
    setFiles(files);
    console.log(files);
  };
  return (
    <div className="w-full pt-24">
      <Chip_ins defination="Upload" />
      <div className="max-w-3xl mx-auto flex  flex-col">
        <h3 className=" text-2xl lg:text-5xl font-medium text-center text-white">
          Upload your PDF to get started
        </h3>
        <p className="text-purple-100/70 mb-5 text-center mt-4 max-w-md px-8 lg:px-2 mx-auto font-medium">
          Simply drag and drop or select a file — our AI will analyze,
          summarize, and let you chat with your document instantly.
        </p>
      </div>

      <div className="p-[1px] w-full mx-auto max-w-4xl rounded-[28px] bg-gradient-to-r from-[#ffaa40] via-[#7702f5] to-[#ffaa40] ">
        <div className=" bg  rounded-[27px] p-2 overflow-hidden">
          <div className="w-full max-w-4xl mx-auto min-h-80  bg-transparent border-neutral-200 dark:border-neutral-800 rounded-lg backdrop-blur-sm">
            <FileUpload onChange={handleFileUpload} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
