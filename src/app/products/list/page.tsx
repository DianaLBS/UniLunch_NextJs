"use client";

import React, { useState } from "react";
import ProductProvider from "../../../context/ProductContext";
import CartProvider from "../../../context/CartContext";
import ProductsPage from "../../../components/products/ProductsPage";
import Sidebar from "../../../components/dashboard/Sidebar";
import ProfileSection from "../../../components/dashboard/ProfileSection"; // Importamos el componente del perfil

const ProductsListPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ProductProvider>
        <div className="flex h-screen">
          <Sidebar role="restaurant" isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
          <div className={`flex-1 flex flex-col bg-gray-100 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-margin duration-300`}>
            <div className="flex justify-end p-4">
              <ProfileSection />
            </div>
            <div className="flex-1 flex items-center justify-center p-6">
              <ProductsPage />
            </div>
          </div>
        </div>
    </ProductProvider>
  );
};

export default ProductsListPage;
