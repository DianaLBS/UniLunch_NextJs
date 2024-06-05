"use client";

import React, { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import UpdateProductForm from "../../../../components/products/UpdateProductForm";
import { useAuth } from "../../../../context/SessionAuthProvider"; // Ajusta la ruta según tu proyecto

const UpdateProductPage = () => {
  const { state: authState } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Extrae el ID del producto desde el pathname
  const productId = pathname ? pathname.split("/").pop() : null;

  useEffect(() => {
    if (!authState.token) {
      router.push("/login");
    }
  }, [authState.token, router]);

  if (!authState.token) {
    return <p>Necesitas loguearte</p>;
  }

  if (!authState.role || authState.role !== "restaurant") {
    return <p>Deberías ser un restaurante</p>;
  }

  if (!productId) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <UpdateProductForm productId={productId} />
    </div>
  );
};

export default UpdateProductPage;
