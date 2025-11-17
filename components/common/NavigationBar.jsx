"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useUserSync } from "@/hooks/useUserSync";

const NavigationBar = () => {
  const pathName = usePathname();
  const [menu, setMenu] = useState(false);
  const { user, dbUser, isSynced, isLoaded } = useUserSync();
  const userId = user?.id;
  const summariesPath = userId ? `/summaries/${userId}` : null;

  const Navdata = [
    { name: "Features", link: "/features" },
    { name: "Contact Us", link: "/contact" },
    { name: "Pricing", link: "/pricing" },
  ];

  return (
    <>
      <div className="flex justify-between md:justify-center mx-auto w-full space-x-4 md:space-x-28 items-center py-6 px-4">
        <div>
          <div className="p-2 rounded-xl bg-violet-600 w-fit border-purple-400 border-2 hover:border-purple-700">
            <Link href="/">
              <FileText size={24} className="text-white" />
            </Link>
          </div>
        </div>

        <div>
          <div className="card px-2 py-3 rounded-xl md:block hidden w-fit border-purple-300 border-1 backdrop-blur-3xl font-syne">
            {Navdata.map((nav) => (
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

            <Link
              href="/upload-pdf"
              className={`px-3 ${
                pathName === "/upload-pdf" ? "text-white" : "text-white/70"
              } hover:text-white`}
            >
              upload pdf
            </Link>

            <SignedIn>
              {summariesPath && (
                <Link
                  href={`/summaries/${userId}`}
                  className={`px-3 ${
                    pathName === summariesPath ? "text-white" : "text-white/70"
                  } hover:text-white`}
                >
                  My Summaries
                </Link>
              )}
            </SignedIn>
          </div>
        </div>

        <div className="md:flex hidden items-center justify-center ">
          <SignedIn>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Upload PDF"
                  labelIcon={`h`}
                  href="/upload-pdf"
                />
                {summariesPath && (
                  <UserButton.Link
                    label="My Summaries"
                    labelIcon={`h`}
                    href={summariesPath}
                  />
                )}
                <UserButton.Link
                  label="Settings"
                  labelIcon={`h`}
                  href="/settings"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>

          <SignedOut>
            <button className="p-2 rounded-xl bg-violet-600 border-purple-400 border-2">
              <Link href="/sign-in">sign in</Link>
            </button>
          </SignedOut>
          <SignedOut>
            <button className="p-2 mx-1 rounded-xl bg-violet-600 border-purple-400 border-2">
              <Link href="/sign-up">sign up</Link>
            </button>
          </SignedOut>
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
                  ? "text-white bg-violet-600 px-2 py-1"
                  : "text-white/70"
              } hover:text-white`}
            >
              {nav.name}
            </Link>
          ))}
          <button className="p-2 my-2 bg-violet-600 border-purple-400 border-2">
            Join waitlist
          </button>
        </div>
      )}
    </>
  );
};

export default NavigationBar;
