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
        console.log("Fetching products...");
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched products:", data);
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
    console.log("Adding to cart:", product);
    cartDispatch({
      type: "ADD_TO_CART",
      payload: {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    });
    console.log("Added to cart:", product);
  };

  if (loading) {
    console.log("Loading products...");
    return <p>Loading...</p>;
  }

  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="products-list">
        {productState.products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          productState.products.map(product => (
            <ProductItem key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))
        )}
      </div>
      <div className="cart-section">
        <CartList />
      </div>
    </div>
  );
};

export default ProductsPage;
