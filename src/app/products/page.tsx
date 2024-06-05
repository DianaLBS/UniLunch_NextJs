"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import NavBar from '@/components/NavBar';
import ProductForm from '@/components/products/ProductForm';
import ProductList from '@/components/products/ProductList';
import {useProducts } from '@/context/ProductContext';
import ProductProvider from '@/context/ProductContext';
import ProductItem from '@/components/products/ProductItem';


const ProductPage = () => {
  const { state, dispatch } = useProducts();
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      dispatch({ type: 'SET_PRODUCTS', payload: data });
    };

    fetchProducts();
  }, [dispatch]);

  const handleAddProduct = async (product) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });

    if (response.ok) {
      const newProduct = await response.json();
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    }
  };

  const handleEditProduct = async (product) => {
    const response = await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });

    if (response.ok) {
      const updatedProduct = await response.json();
      dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
      setEditProduct(null);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      dispatch({ type: 'DELETE_PRODUCT', payload: productId });
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
  };

  return (
    <ProductProvider>
      <div className="flex h-screen">
        <Sidebar role="restaurant" />
        <div className="flex-1 flex flex-col bg-white">
          <NavBar />
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
            <div className="mb-4">
              <ProductForm
                initialData={editProduct}
                onSubmit={editProduct ? handleEditProduct : handleAddProduct}
              />
            </div>
            <ProductList
              products={state.products}
              onDelete={handleDeleteProduct}
              onEdit={handleEditClick}
            />
          </div>
        </div>
      </div>
    </ProductProvider>
  );
};

export default ProductPage;
