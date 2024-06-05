"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Navbar from "@/components/ui/NavBar";
import { useRouter } from "next/navigation";
import StudentDashboard from  "@/components/dashboard/StudentDashboard";
import RestaurantDashboard from "@/components/dashboard/RestaurantDashboard";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Esperar a que la sesión se cargue
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <p>Cargando...</p>;
  }

  if (!session) {
    return null; // Evitar mostrar contenido mientras se redirige
  }

  if (session.user.role === 'student') {
    return <StudentDashboard />;
  }

  if (session.user.role === 'restaurant') {
    return <RestaurantDashboard />;
  }

  return <p>No tienes permisos para ver esta página.</p>;
};

export default DashboardPage;
