import UploadPdf from "@/components/common/UploadPdf";
import Upload from "@/components/home/Upload";
import React from "react";

const page = () => {
  return (
    <div>
      <Upload />
      <UploadPdf />
    </div>
  );
};

export default page;
