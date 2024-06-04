"use client";

import React from "react";
import { Product } from "../context/ProductContext";
import { useAuth } from "../context/SessionAuthProvider";
import { useProducts } from "../context/ProductContext";
import Link from "next/link";

const ProductItem = ({ product }: { product: Product }) => {
  const { state: authState } = useAuth();
  const { dispatch } = useProducts();

  const handleDelete = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${product.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${authState.token}`,
      },
    });

    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: product.id });
    } else {
      console.error("Failed to delete product");
    }
  };

  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>Stock: {product.stock}</p>
      {authState.role === "restaurant" && (
        <>
           <Link href={`/products/edit/${product.id}`} passHref>
            Edit
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default ProductItem;
