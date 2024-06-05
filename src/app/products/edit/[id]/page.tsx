"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductForm from '@/components/products/ProductForm';
import { useAuth } from '@/context/SessionAuthProvider';

const EditProductPage = () => {
  const { state: authState } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [initialData, setInitialData] = useState(null);

  const productId = searchParams.get('id');

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        if (response.ok) {
          const product = await response.json();
          setInitialData(product);
        } else {
          setError('Failed to fetch product details');
        }
      }
    };

    fetchProduct();
  }, [productId, authState.token]);

  const handleSubmit = async (data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
  }) => {
    setError("");

    if (!authState.token) {
      setError("You need to be logged in to edit a product.");
      return;
    }

    if (!authState.role || authState.role !== "restaurant") {
      setError("You must be a restaurant to edit a product.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to edit product");
      }

      // Redirigir a la lista de productos después de editar exitosamente
      router.push("/products/list");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  // Si no hay token o el usuario no es restaurante, mostrar el mensaje de error en lugar del formulario
  if (!authState.token) {
    return <p>You need to be logged in to edit a product.</p>;
  }

  if (!authState.role || authState.role !== "restaurant") {
    return <p>You must be a restaurant to edit a product.</p>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      {initialData ? (
        <ProductForm initialData={initialData} onSubmit={handleSubmit} />
      ) : (
        <p>Loading product details...</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default EditProductPage;
