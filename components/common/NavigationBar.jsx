"use client";
import { FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavigationBar = () => {
  const pathName = usePathname();
  console.log(pathName);
  const login = true;

  const Navdata = [
    {
      name: "Features",
      link: "/features",
    },
    {
      name: "Developers",
      link: "/developers",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Changelog",
      link: "/changelog",
    },
  ];

  return (
    <div className=" flex justify-center space-x-28 items-center py-6">
      <div>
        <div className=" p-2 rounded-xl bg-violet-600 w-fit border-purple-400 border-2 hover:border-purple-700 ">
          <FileText size="24" className=" text-white" />
        </div>
      </div>

      <div>
        <div className="card px-2 py-3 rounded-xl  w-fit border-purple-300 border-1 backdrop-blur-3xl font-syne   ">
          {Navdata.map((nav, idx) => (
            <Link
              href={nav.link}
              key={nav.name}
              className=" px-3 hover:text-white text-white/70"
            >
              {nav.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <button className=" p-2 rounded-xl bg-violet-600  border-purple-400 border-2 ">
          Join waitlist
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
