"use client";
import React from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import { useRouter } from "next/navigation";

const CartList: React.FC = () => {
  const { state, dispatch } = useCart();
  const router = useRouter();

  const handleClose = () => {
    dispatch({ type: "HIDE_CART" });
  };

  const handleCheckout = () => {
    console.log("Navigating to checkout with cart items:", state.cartItems);
    router.push("/checkout");
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
          <div className="total">
            <h2>Total: ${state.totalValue.toFixed(2)}</h2>
          </div>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartList;
