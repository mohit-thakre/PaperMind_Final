"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import Chip_ins from "./Chip_ins";
import { useAuth } from "@clerk/nextjs";
import { ShimmerButton } from "../magicui/shimmer-button";
import Link from "next/link";
import { useUserSync } from "@/hooks/useUserSync";
import { SignedIn } from "@clerk/nextjs";
import { toast, Toaster } from "sonner";
import { redirect, useRouter } from "next/navigation";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, dbUser, isLoaded, isSynced } = useUserSync();
  const { userId } = useAuth();
  const router = useRouter();
  const handleFileUpload = (filesArray) => {
    if (!userId) {
      toast("Sign in required", {
        action: {
          label: "Login",
          onClick: () => router.push("/sign-in"),
        },
      });
      return;
    }

    if (dbUser?.credits <= 0) {
      toast.info("Credit not available", {
        action: {
          label: "Buy credit",
          onClick: () => router.push("/pricing"),
        },
      });
      return;
    }

    const file = filesArray[0];

    if (!file || file.type !== "application/pdf")
      return alert("Please upload a PDF");
    setLoading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      const res = await fetch("/api/upload-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base64Pdf: base64,
          fileName: file.name,
        }),
      });

      const data = await res.json();
      console.log("📄 PDF Upload Response:", data);
      setLoading(false);
      if (res.ok) {
        setFiles({
          url: data.url,
          pdfId: data.pdfId,
          fileName: file.name,
        });
        console.log("✅ PDF mapped to user successfully");
      } else {
        setLoading(false);
        toast.error("Upload failed: " + data.error);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full pt-24 px-4">
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

      <div className="p-[1px] w-full sm:w-[90%] md:w-full max-w-full md:max-w-4xl mx-auto rounded-[28px] bg-gradient-to-r from-[#ffaa40] via-[#7702f5] to-[#ffaa40]">
        <div className="bg rounded-[27px] p-3 sm:p-4 md:p-6 overflow-hidden">
          <div className="w-full min-h-80 bg-transparent m-auto dark:border-neutral-800 rounded-lg backdrop-blur-sm">
            <FileUpload onChange={handleFileUpload} loading={loading} />
          </div>
        </div>
      </div>
      <div className=" mx-auto flex justify-center">
        <SignedIn>
          {files && files.url && (
            <Link href={`/generate-summary/${userId}?pdfId=${files.pdfId}`}>
              <ShimmerButton
                className="px-10 mt-5 mb-10 "
                background="oklch(54.1% .281 293.009)"
              >
                Generate Summary
              </ShimmerButton>
            </Link>
          )}
        </SignedIn>
      </div>
    </div>
  );
};

export default Upload;
