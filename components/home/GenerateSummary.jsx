"use client";
import React, { useState } from "react";
import Chip_ins from "./Chip_ins";
import { useUser } from "@clerk/nextjs";
import parsePDF from "@/actions/parse";
import { summaryGemini } from "@/actions/summary";
import jsPDF from "jspdf";
import { getPdf, saveSummary } from "@/actions/getAndSavepdf";
import { useSearchParams } from "next/navigation";
const GenerateSummary = () => {
  const [title, setTitle] = useState("");
  const [depthToggle, setDepthToggle] = useState("concise");
  const [format, setFormat] = useState("outline");
  const [summaryNew, setSummary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => setTitle(e.target.value);

  const { user } = useUser();

  const searchParams = useSearchParams();
  const pdfId = searchParams.get("pdfId");

  const downloadPdf = () => {
    if (!summaryNew || !summaryNew.pdfFile) return;
    const summaryText =
      summaryNew.pdfFile.summaryText || "Summary not available";
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(16);
    const pdfTitle = summaryNew.pdfFile.fileName || title || "Document Summary";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setSummary(null);
    try {
      const pdf = await getPdf({ pdfId });
      console.log(pdfId, "pdfddd");

      if (!pdf) {
        console.error("❌ No PDF files found");
        return;
      }
      const pdfUrl = pdf.originalFileUrl;
      const pdfText = await parsePDF({ url: pdfUrl });
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: pdfText.toString(),
          depthToggle,
          format,
        }),
      });
      const data = await response.json();
      const generatedSummary = data?.summary;

      const saveSummary_ = await saveSummary({
        pdfId: pdfId,
        parsedText: pdfText,
        summaryText: generatedSummary,
      });

      console.log(saveSummary_);
      setSummary(saveSummary_);
      console.log("✅ Summary generated and saved successfully");
    } catch (error) {
      console.error("❌ Error in handleSubmit:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className=" w-full pt-24 px-4">
      <Chip_ins defination="Genetate Summary" />
      <div className=" max-w-3xl mx-auto flex flex-col">
        <h3 className=" text-2xl lg:text-5xl font-medium text-center text-white">
          Upload your PDF to get started
        </h3>
        <p className="text-purple-100/70 mb-5 text-center mt-4 text-sm md:text-base max-w-md px-8 lg:px-2 mx-auto font-medium">
          Choose how you want your summary — concise, detailed, or page-wise.
          Customize your output before we generate it for you.
        </p>
        <div className="mx-auto">
          <form
            onSubmit={handleSubmit}
            className="shadow-input bg-transparent max-w-3xl p-4 [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] row-span-1 flex flex-col md:mx-0  justify-between space-y-4 rounded-xl border border-purple-400/20  transition duration-200 dark:shadow-none"
          >
            <div className=" flex flex-col max-w-3xl mx-auto">
              <div className=" flex  flex-col gap-4">
                <div className=" pt-3">
                  <label htmlFor="title" className=" font-semibold text-xl ">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    defaultValue={"untitled"}
                    onChange={handleChange}
                    required
                    className="p-3 border border-purple-400/20 rounded-full  w-full my-1"
                  ></input>
                </div>
                <div className=" pt-3">
                  <label htmlFor="longest" className=" font-semibold text-xl ">
                    How long should the note be?
                  </label>
                  <div className=" flex space-x-2 py-2">
                    <button
                      className={`py-2 px-4 rounded-xl border border-purple-400/20 ${
                        depthToggle == "inDepth" ? "bg-purple-950/30" : ""
                      }`}
                      onClick={() => setDepthToggle("inDepth")}
                    >
                      In-depth Notes
                    </button>
                    <button
                      className={`py-2 px-4 rounded-xl border border-purple-400/20 ${
                        depthToggle == "concise" ? "bg-purple-950/30" : ""
                      }`}
                      onClick={() => setDepthToggle("concise")}
                    >
                      Concise Summary
                    </button>
                  </div>
                </div>
                <div className=" pt-3">
                  <label htmlFor="longest" className=" font-semibold text-xl ">
                    How would you like your notes to be structured?
                  </label>
                  <div className=" flex space-x-2 py-2">
                    <button
                      className={`py-2 px-4 rounded-xl border border-purple-400/20 ${
                        format == "outline" ? "bg-purple-950/30" : ""
                      }`}
                      onClick={() => setFormat("outline")}
                    >
                      Outline Format
                    </button>
                    <button
                      className={`py-2 px-4 rounded-xl border border-purple-400/20 ${
                        format == "paragraph" ? "bg-purple-950/30" : ""
                      }`}
                      onClick={() => setFormat("paragraph")}
                    >
                      Paragraph Format
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="p-3 my-4 cursor-pointer rounded-full w-full bg-violet-600/10 border-purple-400/30 border disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? "🔄 Generating Summary..." : "Generate Summary"}
              </button>
            </div>
          </form>
          {summaryNew && summaryNew.summaryText && (
            <button
              onClick={downloadPdf}
              className="flex-1 cursor-pointer p-3 w-full mx-auto my-2 bg-green-600/20 border border-green-400/30 rounded-full text-green-300 hover:bg-green-600/30 transition-colors"
            >
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateSummary;
