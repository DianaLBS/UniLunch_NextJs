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
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 mb-4">Close</button>
      {state.cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <div>
          {state.cartItems.map(item => (
            <CartItem key={item.productId} item={item} />
          ))}
          <div className="total mt-4">
            <h2 className="text-2xl font-bold">Total: ${state.totalValue.toFixed(2)}</h2>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartList;
