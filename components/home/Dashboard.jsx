"use client";
import React, { useEffect, useState } from "react";
import Chip_ins from "./Chip_ins";
import jsPDF from "jspdf";
import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import { useUserSync } from "@/hooks/useUserSync";

import { toast, Toaster } from "sonner";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, dbUser, isLoaded, isSynced } = useUserSync();
  const downloadPDF = (pdf) => {
    const summaryText = pdf.summaryText || "Summary not available";

    const doc = new jsPDF();

    doc.setFont("helvetica");
    doc.setFontSize(16);

    const pdfTitle = pdf.fileName || "Document Summary";
    doc.text(pdfTitle, 20, 30);

    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    doc.setFontSize(12);

    const pageWidth = 170;
    const lines = doc.splitTextToSize(summaryText, pageWidth);

    let yPosition = 50;
    const lineHeight = 7;
    const pageHeight = 280;

    lines.forEach((line) => {
      if (yPosition > pageHeight) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, 20, yPosition);
      yPosition += lineHeight;
    });

    doc.save(`summary-${pdfTitle.replace(/\s+/g, "-")}.pdf`);
  };

  const deletePDF = async (pdfId) => {
    try {
      const response = await fetch("/api/delete-pdf", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pdfId }),
      });

      if (response.ok) {
        setPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf.id !== pdfId));
        console.log("PDF deleted successfully");
      } else {
        console.error("Failed to delete PDF");
      }
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch("/api/get-user-pdfs");
        if (response.ok) {
          const data = await response.json();
          setPdfs(data.pdfFiles || []);
          console.log("pdfs-", data);
        } else {
          console.error("Failed to fetch PDFs:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  return (
    <div className=" w-full pt-24">
      <Toaster />
      <Chip_ins defination="My Summaries" />
      <div className=" max-w-3xl mx-auto flex flex-col">
        <h3 className=" text-2xl lg:text-5xl font-medium text-center text-white">
          download all summaries.
        </h3>
        <p className="text-purple-100/70 mb-5 text-center mt-4 text-sm md:text-base max-w-md px-8 lg:px-2 mx-auto font-medium">
          View and download your previously generated PDF summaries. Each
          summary is saved automatically when you generate it.
        </p>
        <div className="mx-auto w-full max-w-4xl">
          <div className="shadow-input bg-transparent max-w-6xl p-6 [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] row-span-1 flex flex-col md:mx-0 justify-between space-y-4 rounded-xl border border-purple-400/20 transition duration-200 dark:shadow-none">
            {loading ? (
              <div className="text-center text-white/70 py-8">
                Loading your PDFs...
              </div>
            ) : pdfs.length > 0 ? (
              <div className="overflow-x-auto  rounded-2xl">
                <table className="w-full text-sm text-left text-white/90">
                  <thead className="text-sm font-bold text-white/70 uppercase bg-white/5 bg-blue/200  rounded-2xl ">
                    <tr>
                      <th scope="col" className="px-6 py-3 font-medium">
                        File Name
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Upload Date
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 font-medium text-center"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pdfs.map((pdf, index) => (
                      <tr
                        key={pdf.id}
                        className=" border-b border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-white truncate max-w-xs">
                          {pdf.fileName.substr(0, 20)}
                        </td>
                        <td className="px-6 py-4 text-white/70">
                          {new Date(pdf.uploadedAt).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4 text-center space-x-1">
                          {pdf.summaryText ? (
                            <button
                              onClick={() => downloadPDF(pdf)}
                              className="bg-green-600/20 border  cursor-pointer border-green-400/30  text-green-300 hover:bg-green-600/30 transition-colors px-4 py-1 text-sm font-medium  rounded-2xl"
                            >
                              Download PDF
                            </button>
                          ) : (
                            <Link
                              href={`/generate-summary/${user.id}?pdfId=${pdf.id}`}
                            >
                              <button className="bg-blue-600/20 border cursor-pointer border-blue-400/30  text-blue-300 hover:bg-blue-600/30 transition-colors px-4 py-1 text-sm font-medium rounded-2xl">
                                ⚡ Generate
                              </button>
                            </Link>
                          )}
                          <button
                            onClick={() => deletePDF(pdf.id)}
                            className="bg-red-600/20 border cursor-pointer border-red-400/30  text-red-300 hover:bg-red-600/30 transition-colors px-4 py-1 text-sm font-medium rounded-2xl"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-white/70 py-8">
                No PDFs found. Upload some PDFs to see them here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
