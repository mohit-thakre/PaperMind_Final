"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

import { motion } from "motion/react";
import Chip_ins from "./Chip_ins";
import {
  Bot,
  BotIcon,
  BrainCircuit,
  Command,
  FileDown,
  FileText,
  Globe,
  Paperclip,
  ReceiptText,
  Sparkle,
  Upload,
  UserCircle,
  Workflow,
} from "lucide-react";
import { AvatarIcon } from "@radix-ui/react-icons";

function BentoGridThirdDemo() {
  return (
    <>
      <Chip_ins defination="Features" />
      <div className="max-w-3xl mx-auto flex  flex-col">
        <h3 className=" text-2xl lg:text-5xl font-medium text-center text-white">
          Smart Features Powered by AI
        </h3>
        <p className="text-purple-100/70 mb-5 text-center mt-4 max-w-md px-8 lg:px-2 mx-auto font-medium">
          Effortless PDF interaction with intelligent tools for enhanced
          understanding, speed, and accessibility.
        </p>
      </div>
      <BentoGrid className="max-w-4xl  py-6 mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn("[&>p:text-lg]", item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 "
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full bg-transaparent  [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border border-purple-300 dark:border-white/[0.2] p-2  items-center space-x-2 bg dark:bg-black"
      >
        <Command />
        <div className="w-full  h-4 rounded-full ">Comprehend</div>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border bg-transaparent  [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border-purple-300 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg dark:bg-black"
      >
        <Paperclip />
        <div className="w-full  h-4 rounded-full ">Summarize</div>
      </motion.div>
      <motion.div
        variants={variants}
        className="flex  justify-center  rounded-full border bg-transaparent  [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border-purple-300 dark:border-white/[0.2] p-2 items-center space-x-2 bg dark:bg-black"
      >
        <ReceiptText />
        <div className="w-full  h-4 rounded-full ">Interact</div>
      </motion.div>
    </motion.div>
  );
};
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  const languages = [
    { name: "Hindi", flag: "https://flagcdn.com/w40/in.png" },
    { name: "English", flag: "https://flagcdn.com/w40/gb.png" },
    { name: "Dutch", flag: "https://flagcdn.com/w40/nl.png" },
    { name: "French", flag: "https://flagcdn.com/w40/fr.png" },
  ];
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {languages.map((lang, i) => (
        <motion.div
          key={"language-" + i}
          variants={variants}
          className="flex flex-row items-center space-x-2 rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 bg-neutral-100 dark:bg-black w-fit h-8"
        >
          <img
            src={lang.flag}
            alt={lang.name}
            className="h-5 w-5 rounded-full"
          />
          <span className="text-sm font-medium text-purple-900 dark:text-white">
            {lang.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  const fileFormats = ["PDF", "DOCX", "TXT", "PPTX", "CSV"];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 bg-transaparent [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col justify-center items-center space-y-4 p-4"
      // style={{
      //   background:
      //     "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
      //   backgroundSize: "400% 400%",
      // }}
    >
      <div className="flex flex-wrap gap-2 justify-center">
        {fileFormats.map((format, index) => (
          <span
            key={index}
            className="px-4 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20 backdrop-blur"
          >
            {format}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <Upload className="h-10 w-10 text-white" />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Drag and drop or select documents.
        </p>
        <p className="border border-violet-500 bg-purple-600 dark:bg-red-900/20 text-white text-xs rounded-full px-2 py-0.5 mt-4">
          Import
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        <Sparkle className="h-10 w-10 text-white " />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          perform sentiment or entity analysis with AI.
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Analyze
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <FileDown className="h-10 w-10 text-white " />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Get concise summaries or topic highlights with AI.
        </p>
        <p className="border border-violet-800 bg-violet-600 dark:bg-orange-900/20 text-violet-100 text-xs rounded-full px-2 py-0.5 mt-4">
          Export
        </p>
      </motion.div>
    </motion.div>
  );
};
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2 items-start space-x-2"
      >
        <AvatarIcon className="rounded-full h-10 w-10" />
        <p className="text-xs text-neutral-500">
          What is the main conclusion of this PDF document?
        </p>
      </motion.div>

      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-[80%] ml-auto bg dark:bg-black"
      >
        <p className="text-xs text-neutral-500">
          The document concludes <br /> that AI boosts productivity.
        </p>
        <Bot className="h-6 w-6 p-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "AI-Powered Summarization",
    description: (
      <span className="text-sm">
        Generate high-quality, accurate summaries using advanced AI models.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <BrainCircuit className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Multilingual Support",
    description: (
      <span className="text-sm">
        Access and summarize PDFs in languages like Hindi, English, French,
        Dutch, and more.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <Globe className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Multiple Format Support",
    description: (
      <span className="text-sm">
        Upload and work with PDFs, DOCs, TXTs, and more without hassle.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <FileText className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Smart Workflow",
    description: (
      <span className="text-sm">
        Just import your file, summarize with AI, and export the insights
        effortlessly.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <Workflow className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Chat with PDF",
    description: (
      <span className="text-sm">
        Ask questions directly to your PDF and get real-time, AI-powered
        answers.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <BotIcon className="h-4 w-4 text-neutral-500" />,
  },
];

export default BentoGridThirdDemo;
