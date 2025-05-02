import React from "react";

const Chip_ins = ({ defination }) => {
  return (
    <div className="group relative mx-auto flex bg-transparent max-w-fit flex-row origin-top-left items-center justify-center rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-300  [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40 mb-3 hover:-rotate-2">
      <div className="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]"></div>
      🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
      <span className="inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
        {defination}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-chevron-right ml-1 size-3   "
      >
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    </div>
  );
};

export default Chip_ins;
