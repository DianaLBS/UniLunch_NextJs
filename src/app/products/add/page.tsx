"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "../../../components/products/ProductForm";
import { useAuth } from "../../../context/SessionAuthProvider";
import backgroundImage from "/public/RefRetaurante.png";

const AddProductPage = () => {
  const { state: authState } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
  }) => {
    setError("");

    if (!authState.token) {
      setError("Necesitas estar conectado para agregar un producto.");
      return;
    }

    if (!authState.role || authState.role !== "restaurant") {
      setError("Debes ser un restaurante para agregar un producto.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("No se pudo agregar el producto");
      }

      // Redirigir a la lista de productos después de añadir exitosamente
      router.push("/products/list");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  // Si no hay token o el usuario no es restaurante, mostrar el mensaje de error en lugar del formulario
  if (!authState.token) {
    return <p className="text-red-500 text-center mt-4">Necesitas estar conectado para agregar un producto.</p>;
  }

  if (!authState.role || authState.role !== "restaurant") {
    return <p className="text-red-500 text-center mt-4">Debes ser un restaurante para agregar un producto.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <div className="max-w-4xl w-full bg-white bg-opacity-90 p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Añadir Producto</h1>
        <ProductForm onSubmit={handleSubmit} />
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default AddProductPage;
