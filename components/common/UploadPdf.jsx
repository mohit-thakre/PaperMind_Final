"use client";

import { useState } from "react";

export default function UploadPdf() {
  const [pdfUrl, setPdfUrl] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf")
      return alert("Please upload a PDF");

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1]; // Strip metadata

      const res = await fetch("/api/upload-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64Pdf: base64 }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setPdfUrl(data.url);
      } else {
        alert("Upload failed");
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4">
      <input type="file" accept="application/pdf" onChange={handleUpload} />
      {pdfUrl && (
        <p className="mt-4 text-blue-600">
          PDF Uploaded:{" "}
          <a href={pdfUrl} target="_blank" rel="noreferrer">
            View
          </a>
        </p>
      )}
    </div>
  );
}
