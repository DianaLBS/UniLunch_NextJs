"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import UpdateProductForm from "../../../../components/products/UpdateProductForm";
import { useAuth } from "../../../../context/SessionAuthProvider";
import backgroundImage from "/public/RefRetaurante.png"; // Asegúrate de que la ruta sea correcta

const UpdateProductPage = () => {
  const { state: authState } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Extrae el ID del producto desde el pathname
  const productId = pathname ? pathname.split("/").pop() : null;

  useEffect(() => {
    if (!authState.token) {
      router.push("/login");
    }
  }, [authState.token, router]);

  if (!authState.token) {
    return <p className="text-red-500 text-center mt-4">Necesitas estar logueado para editar un producto.</p>;
  }

  if (!authState.role || authState.role !== "restaurant") {
    return <p className="text-red-500 text-center mt-4">Debes ser un restaurante para editar un producto.</p>;
  }

  if (!productId) {
    return <p className="text-red-500 text-center mt-4">Cargando...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <div className="max-w-4xl w-full bg-white bg-opacity-90 p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Editar Producto</h1>
        <UpdateProductForm productId={productId} />
      </div>
    </div>
  );
};

export default UpdateProductPage;
