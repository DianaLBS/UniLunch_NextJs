"use client";
import React from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";

const CartList: React.FC = () => {
  const { state, dispatch } = useCart();

  const handleClose = () => {
    dispatch({ type: "HIDE_CART" });
  };

  return (
    <div className={`cart-list ${state.isCartVisible ? 'visible' : ''}`}>
    <h1>Cart</h1>
    <button onClick={handleClose}>Close</button>
    {state.cartItems.length === 0 ? (
      <p>No items in the cart.</p>
    ) : (
      <div>
        {state.cartItems.map(item => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>
    )}
  </div>
  );
};

export default CartList;
