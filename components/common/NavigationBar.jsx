"use client";
import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const NavigationBar = () => {
  const pathName = usePathname();
  console.log(pathName);
  const login = true;

  const [menu, setMenu] = useState(false);
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
    <>
      <div className="flex justify-center space-x-28 items-center py-6">
        <div>
          <div className="p-2 rounded-xl bg-violet-600 w-fit border-purple-400 border-2 hover:border-purple-700">
            <FileText size="24" className="text-white" />
          </div>
        </div>

        <div>
          <div className="card px-2 py-3 rounded-xl md:block hidden w-fit border-purple-300 border-1 backdrop-blur-3xl font-syne">
            {Navdata.map((nav, idx) => (
              <Link
                href={nav.link}
                key={nav.name}
                className={`px-3 ${
                  pathName === nav.link ? "text-white" : "text-white/70"
                } hover:text-white`}
              >
                {nav.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="md:block hidden">
          <button className="p-2 rounded-xl bg-violet-600 border-purple-400 border-2">
            Join waitlist
          </button>
        </div>

        <div
          className="md:hidden block duration-300 cursor-pointer"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X size={35} /> : <Menu size={35} />}
        </div>
      </div>

      {menu && (
        <div className="w-full bg-transparent flex flex-col items-end justify-end backdrop-blur-3xl transition-all duration-500 ease-in-out opacity-100 scale-100">
          {Navdata.map((nav) => (
            <Link
              href={nav.link}
              key={nav.name}
              className={`px-6 py-2 text-xl ${
                pathName === nav.link
                  ? "text-white bg-violet-600  px-2 py-1"
                  : "text-white/70"
              } hover:text-white`}
            >
              {nav.name}
            </Link>
          ))}
          <button className="p-2 my-2  bg-violet-600 border-purple-400 border-2">
            Join waitlist
          </button>
        </div>
      )}
    </>
  );
};

export default NavigationBar;
