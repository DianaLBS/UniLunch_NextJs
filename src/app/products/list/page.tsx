"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/SessionAuthProvider";
import ProductItem from '@/components/products/ProductItem';
import { useProducts } from "../../../context/ProductContext";

const ProductsPage = () => {
  const { state: authState } = useAuth();
  const { state: productState, dispatch } = useProducts();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
        const data = await response.json();
        dispatch({ type: "SET_PRODUCTS", payload: data });
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Products</h1>
      {productState.products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsPage;
