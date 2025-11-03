"use client";
import { useUserSync } from "@/hooks/useUserSync";

const DirectUsage = () => {
  const { user, dbUser, isLoaded, isSynced, isLoading } = useUserSync();

  // Show loading while syncing
  if (!isLoaded || isLoading) {
    return <div>Setting up your account...</div>;
  }

  // Show sign-in prompt if not authenticated
  if (!user) {
    return <div>Please sign in to continue.</div>;
  }

  // Show syncing message for new users
  if (!isSynced) {
    return <div>Syncing your account...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <p>Your database ID: {dbUser?.id}</p>
      <p>Your email: {user.emailAddresses[0].emailAddress}</p>
    </div>
  );
};

export default DirectUsage;

