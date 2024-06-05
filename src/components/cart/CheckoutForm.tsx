"use client";
import React, { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/SessionAuthProvider";
import { useRouter } from "next/navigation";

const CheckoutForm: React.FC = () => {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { state: authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("Cart state at checkout:", cartState);
  }, [cartState]);

  const handleCheckout = async () => {
    if (cartState.cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const saleDetails = cartState.cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const payload = {
      saleDetails,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authState.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to complete the checkout.");
      }

      const result = await response.json();
      console.log("Checkout successful:", result);

      cartDispatch({ type: "CLEAR_CART" });
      alert("Checkout successful!");
      router.push("/success");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      <p>Total: ${cartState.totalValue.toFixed(2)}</p>
      <button onClick={handleCheckout}>Complete Purchase</button>
    </div>
  );
};

export default CheckoutForm;
