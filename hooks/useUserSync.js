"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useUserSync = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [dbUser, setDbUser] = useState(null);
  const [isSynced, setIsSynced] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let toastId = null;
    if (!isLoaded) {
      toastId = toast.loading("Setting up...");
      console.log("loaded the clerk successfull")
      return;
    }
    const syncUser = async () => {
      
    toastId = toast.dismiss(toastId);

    
     

    

      // ✅ Now sync the logged-in user
      setIsLoading(true);
     

      try {
        const res = await fetch("/api/get-user");
        const data = await res.json();

        if (data.success) {
          setDbUser(data.user);
          setIsSynced(true);
          
          if (data.isNewUser) {
          toastId =   toast.info("🎉 Welcome! Your account has been created.");
          }
        } else {
          toast.error("⚠️ Failed to sync user data");
          setDbUser(null);
          setIsSynced(false);
        }
      } catch (err) {
        console.error("❌ Error syncing user:", err);
        toast.error("Server error while syncing user");
        setDbUser(null);
        setIsSynced(false);
      } finally {
        setIsLoading(false);
        toast.dismiss(toastId);
      }
    };

    syncUser();

    // cleanup (dismiss toast on unmount)
    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isLoaded, isSignedIn, user?.id]);

  return {
    user,
    dbUser,
    isLoaded,
    isSynced,
    isLoading,
  };
};
