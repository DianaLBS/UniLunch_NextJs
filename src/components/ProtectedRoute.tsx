import { useSession, signIn } from "next-auth/react";
import React from "react";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
