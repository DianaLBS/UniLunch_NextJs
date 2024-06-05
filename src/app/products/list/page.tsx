"use client";

import React from "react";
import ProductProvider from "../../../context/ProductContext";
import CartProvider from "../../../context/CartContext";
import ProductsPage from "../../../components/products/ProductsPage";
import CartList from "../../../components/cart/CartList";  // Importamos el componente del carrito

const ProductsListPage = () => {
  return (
      <ProductsPage />
  );
};

export default ProductsListPage;
