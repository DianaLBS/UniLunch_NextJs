"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/SessionAuthProvider";
import ProductItem from "./ProductItem";
import CartList from "../cart/CartList";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";

const ProductsPage = () => {
  const { state: authState } = useAuth();
  const { state: productState, dispatch: productDispatch } = useProducts();
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        productDispatch({ type: "SET_PRODUCTS", payload: data });
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productDispatch]);

  const handleAddToCart = (product: { id: any; name: any; price: any; }) => {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    });
  };

  if (loading) {
    return <p>Cargando...</p>;
}

return (
  <div className="products-page p-4 bg-gradient-to-r from-blue-500 to-indigo-700 min-h-screen">
    <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productState.products.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          productState.products.map(product => (
            <ProductItem key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))
        )}
      </div>
      {authState.role === "student" && (
        <div className="cart-section mt-6">
          <CartList />
        </div>
      )}
    </div>
  </div>
);
};

export default ProductsPage;

