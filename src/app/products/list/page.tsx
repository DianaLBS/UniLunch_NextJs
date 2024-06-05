"use client";

import React from "react";
import ProductProvider from "../../../context/ProductContext";
import CartProvider from "../../../context/CartContext";
import ProductsPage from "../../../components/products/ProductsPage";
import Sidebar from "../../../components/dashboard/Sidebar";
import ProfileSection from "../../../components/dashboard/ProfileSection"; // Importamos el componente del perfil

const ProductsListPage = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <div className="flex h-screen">
          <Sidebar role="restaurant" />
          <div className="flex-1 flex flex-col bg-gray-100">
            <div className="flex justify-end p-4">
              <ProfileSection />
            </div>
            <div className="flex-1 flex items-center justify-center p-6">
              <ProductsPage />
            </div>
          </div>
        </div>
      </CartProvider>
    </ProductProvider>
  );
};

export default ProductsListPage;
