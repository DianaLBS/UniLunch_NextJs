"use client";
import React from "react";
import { Product, useProducts } from "../../context/ProductContext";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const { state } = useProducts();
  

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {state.products.map(product => (
          <ProductItem key={product.id} product={product} onAddToCart={(product: Product) => {
            throw new Error("Function not implemented.");
          } } />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
