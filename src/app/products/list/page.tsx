"use client";

import React from "react";
import ProductProvider from "../../../context/ProductContext";
import CartProvider from "../../../context/CartContext";
import ProductsPage from "../../../components/products/ProductsPage";

const ProductsListPage = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <ProductsPage />
      </CartProvider>
    </ProductProvider>
  );
};

export default ProductsListPage;
