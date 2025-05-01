import React from "react";
import Chip_ins from "./Chip_ins";
import { DotPattern } from "../magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "../magicui/shimmer-button";

const Hero = () => {
  return (
    <div>
      <div className="relative flex min-h-[500px] w-full flex-col items-center justify-start pt-20 overflow-hidden">
        <DotPattern
          glow={true}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />
        <Chip_ins />
        <h1 className="text-4xl md:text-7xl text-center py-1">
          Revolutionize Your <br />
          <span className="from-purple-100 via-100% to-purple-950 text-transparent bg-clip-text bg-gradient-to-b">
            Web Rankings
          </span>{" "}
          with AI
        </h1>
        <p className="mt-5 font-100 text-center text-sm md:text-base px-4 md:px-0">
          Elevate your site's visibility effortlessly with AI, where smart
          technology meets <br className="hidden md:block" />
          user-friendly SEO tools.
        </p>
        <ShimmerButton
          className="px-20 mt-5 mb-10 "
          background="oklch(54.1% .281 293.009)"
        >
          Get Started
        </ShimmerButton>
      </div>
    </div>
  );
};

export default Hero;
