// components/ProtectedRoute.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../context/SessionAuthProvider";

const ProtectedRoute = ({ children, roles }: { children: React.ReactNode, roles: any }) => {
  const { data: session, status } = useSession();
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/login");

    const userRole = session?.user?.role || state.role;
    if (roles && !roles.includes(userRole)) {
      router.push("/unauthorized");
    }
  }, [session, status, router, state.role]);

  if (status === "loading" || !session) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
