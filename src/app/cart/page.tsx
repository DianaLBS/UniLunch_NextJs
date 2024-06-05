"use client";
import React, { useEffect } from "react";
import CartList from "../../components/cart/CartList";
import CartProvider from "../../context/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/SessionAuthProvider";

const CartPage = () => {
    const { state: authState } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authState.token) {
            router.push("/dashboard");
        }
        }, [authState.token, router]);

        if (!authState.token) {
        return router.push("/dashboard");
        }

        if (!authState.role || authState.role !== "student") {
        return router.push("/products/list");
        }

  return (
    <CartProvider>
      <CartList />
    </CartProvider>
  );
};

export default CartPage;
