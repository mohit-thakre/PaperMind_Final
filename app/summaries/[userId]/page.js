"use client";
import Dashboard from "@/components/home/Dashboard";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Page = () => {
  const { userId } = useAuth();
  if (!userId) {
    toast("Login required", {
      action: {
        label: "Login",
        onClick: () => redirect("/sign-in"),
      },
    });
    redirect("/sign-in");
  }
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default Page;
