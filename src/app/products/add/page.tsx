"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "../../../components/ProductForm";
import { useAuth } from "../../../context/SessionAuthProvider";

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
      setError("You need to be logged in to add a product.");
      return;
    }

    if (!authState.role || authState.role !== "restaurant") {
      setError("You must be a restaurant to add a product.");
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
        throw new Error("Failed to add product");
      }

      // Redirigir a la lista de productos después de añadir exitosamente
      router.push("/products/list");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  // Si no hay token o el usuario no es restaurante, mostrar el mensaje de error en lugar del formulario
  if (!authState.token) {
    return <p>You need to be logged in to add a product.</p>;
  }

  if (!authState.role || authState.role !== "restaurant") {
    return <p>You must be a restaurant to add a product.</p>;
  }

  return (
    <div>
      <h1>Add Product</h1>
      <ProductForm onSubmit={handleSubmit} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddProductPage;
