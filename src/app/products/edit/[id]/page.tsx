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
    return <p>You need to be logged in to update a product.</p>;
  }

  if (!authState.role || authState.role !== "restaurant") {
    return <p>You should be a restaurant</p>;
  }

  if (!productId) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <UpdateProductForm productId={productId} />
    </div>
  );
};

export default UpdateProductPage;
