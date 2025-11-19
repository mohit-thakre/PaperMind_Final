import React from "react";
import Chip_ins from "./Chip_ins";
import { DotPattern } from "../magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "../magicui/shimmer-button";
import DashboardImage from "./DashboardImage";
import Partners from "./Partners";
import Features from "./Features";
import Plans from "./Plans";
import Upload from "./Upload";
import Faqs from "./Faqs";
import Footer from "../common/Footer";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="">
      <div className="relative flex min-h-[500px] w-full flex-col items-center justify-start pt-20 overflow-hidden">
        <DotPattern
          glow={true}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />
        <Chip_ins defination="AI PDF Summary Workspace" />
        <h1 className="text-5xl md:text-7xl text-center py-1">
          Turn Any PDF into <br />
          <span className="from-purple-100 via-100% to-purple-950 text-transparent bg-clip-text bg-gradient-to-b">
            Ready to Use
          </span>
          <span> </span>
          Insights
        </h1>
        <p className="mt-5 font-medium text-center text-sm md:text-base px-4 md:px-0 text-purple-100/70 ">
          Upload research papers, lecture notes, or manuals and get concise
          <br />
          summaries, smart outlines, and instant answers in seconds.
        </p>
        <Link href="/upload-pdf">
          <ShimmerButton
            className="px-10 mt-5 mb-10 "
            background="oklch(54.1% .281 293.009)"
          >
            Upload a PDF
          </ShimmerButton>
        </Link>
      </div>
      <DashboardImage />
      <Partners />
      <Features />
      <Plans />
      <Upload />
      <Faqs />
      <div className=" h-[1.5px] bg-gradient-to-r from-transparent via-purple-600 to-transparent my-12"></div>
    </div>
  );
};

export default Hero;
