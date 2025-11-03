"use client";
import { useUserSync } from "@/hooks/useUserSync";
import { useEffect } from "react";

const UserSyncWrapper = ({ children }) => {
  const { user, dbUser, isLoaded, isSynced, isLoading } = useUserSync();

  if (!isLoaded || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default UserSyncWrapper;
