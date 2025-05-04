import React from "react";
import Chip_ins from "./Chip_ins";

import Image from "next/image";
import { logos } from "@/data/logo";

const Partners = () => {
  return (
    <div className="w-full pt-24">
      <Chip_ins defination="Trusted By" />
      <div className="max-w-3xl mx-auto flex  flex-col">
        <h3 className=" text-2xl lg:text-5xl font-medium text-center text-white">
          Start building today
        </h3>
        <p className="text-purple-100/70 mb-5 text-center mt-4 max-w-md px-8 lg:px-2 mx-auto text-sm  md:text-base font-medium">
          Building SaaS has never been easier. Choose the right plan for you and
          start your free trial right now.
        </p>
      </div>
      <div className="max-w-full overflow-hidden relative py-8">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...logos, ...logos].map((item, idx) => (
            <Image
              key={idx}
              alt="Partner logo"
              loading="lazy"
              width="100"
              height="40"
              decoding="async"
              data-nimg="1"
              className="w-auto h-6 sm:h-8 md:h-10 mx-4 sm:mx-6 grayscale hover:opacity-50 transition-all"
              style={{ color: "transparent" }}
              src={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
