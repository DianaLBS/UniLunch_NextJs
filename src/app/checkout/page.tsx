"use client";
import React from "react";
import CartProvider from "../../context/CartContext";
import CheckoutForm from "../../components/cart/CheckoutForm";

const CheckoutPage = () => {
  return (
    <CartProvider>
      <CheckoutForm />
    </CartProvider>
  );
};

export default CheckoutPage;
