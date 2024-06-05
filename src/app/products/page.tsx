"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import NavBar from '@/components/NavBar';
import ProductForm from '@/components/products/ProductForm';
import ProductList from '@/components/products/ProductList';
import { useProducts } from '@/context/ProductContext';
import ProductProvider from '@/context/ProductContext';
import { useAuth } from '@/context/SessionAuthProvider';
import { useRouter } from 'next/navigation';

const ProductPage = () => {
  const { state: authState } = useAuth();
  const { state, dispatch } = useProducts();
  const router = useRouter();
  const [editProduct, setEditProduct] = useState(null);
  const [message, setMessage] = useState('');

  const showMessage = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => {
      setMessage('');
    }, 3000); // Ocultar el mensaje después de 3 segundos
  };

  const handleAddProduct = async (product: any) => {
    setMessage('');
    if (!authState.token) {
      setMessage('You need to be logged in to add a product.');
      return;
    }

    if (!authState.role || authState.role !== 'restaurant') {
      setMessage('You must be a restaurant to add a product.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const newProduct = await response.json();
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
      showMessage('Producto agregado exitosamente');
    } catch (err: any) {
      setMessage(err.message || 'Error al agregar el producto');
    }
  };

  const handleEditProduct = async (product: { id: any; }) => {
    setMessage('');
    if (!authState.token) {
      setMessage('You need to be logged in to edit a product.');
      return;
    }

    if (!authState.role || authState.role !== 'restaurant') {
      setMessage('You must be a restaurant to edit a product.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to edit product');
      }

      const updatedProduct = await response.json();
      dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
      setEditProduct(null);
      showMessage('Producto editado exitosamente');
    } catch (err: any) {
      setMessage(err.message || 'Error al editar el producto');
    }
  };

  const handleDeleteProduct = async (productId: any) => {
    setMessage('');
    if (!authState.token) {
      setMessage('You need to be logged in to delete a product.');
      return;
    }

    if (!authState.role || authState.role !== 'restaurant') {
      setMessage('You must be a restaurant to delete a product.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authState.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      dispatch({ type: 'DELETE_PRODUCT', payload: productId });
      showMessage('Producto eliminado exitosamente');
    } catch (err: any) {
      setMessage(err.message || 'Error al eliminar el producto');
    }
  };

  const handleEditClick = (product: any) => {
    setEditProduct(product);
  };

  if (!authState.token) {
    return <p>You need to be logged in to manage products.</p>;
  }

  if (!authState.role || authState.role !== 'restaurant') {
    return <p>You must be a restaurant to manage products.</p>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar role="restaurant" />
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
          {message && (
            <div className={`mb-4 p-2 rounded ${message.type === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
              {message.text}
            </div>
          )}
          <div className="mb-4">
            <ProductForm
              initialData={editProduct}
              onSubmit={editProduct ? handleEditProduct : handleAddProduct}
            />
          </div>
          <ProductList
            onDelete={handleDeleteProduct}
            onEdit={handleEditClick}
          />
        </div>
      </div>
    </div>
  );
};

const ProductPageWrapper = () => (
  <ProductProvider>
    <ProductPage />
  </ProductProvider>
);

export default ProductPageWrapper;
