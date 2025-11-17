"use client";
import { useUserSync } from "@/hooks/useUserSync";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

const UserSyncWrapper = ({ children }) => {
  const { user, dbUser, isSynced, isLoading } = useUserSync();

  if (!user) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default UserSyncWrapper;
