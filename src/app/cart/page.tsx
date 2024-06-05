"use client";
import React from "react";
import CartList from "../../components/cart/CartList";
import CartProvider from "../../context/CartContext";

const CartPage = () => {
  return (
    <CartProvider>
      <CartList />
    </CartProvider>
  );
};

export default CartPage;
