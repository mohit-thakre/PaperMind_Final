"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const useUserSync = () => {
  const { user, isLoaded } = useUser();
  const [dbUser, setDbUser] = useState(null);
  const [isSynced, setIsSynced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      // if (!isLoaded || !user) {
      //   setIsSynced(false);
      //   return;
      // }


      setIsLoading(true);
      try {
        const response = await fetch("/api/get-user");
        const data = await response.json();
        
        if (data.success) {
          setDbUser(data.user);
          setIsSynced(true);
          
          if (data.isNewUser) {
            console.log("🎉 Welcome! Your account has been created.");
          }
        }
      } catch (error) {
        console.error("❌ Failed to sync user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    syncUser();
  }, [user, isLoaded, isSynced]);

  return {
    user,
    dbUser,
    isLoaded,
    isSynced,
    isLoading,
  };
};
