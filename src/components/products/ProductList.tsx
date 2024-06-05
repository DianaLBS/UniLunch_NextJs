"use client";
import React from "react";
import { useProducts } from "../context/ProductContext";
import ProductItem from "./products/ProductItem";

const ProductList = () => {
  const { state } = useProducts();

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {state.products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
