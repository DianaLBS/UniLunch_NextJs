"use client";
import React, { useEffect } from "react";
import CheckoutForm from "../../components/cart/CheckoutForm";
import CartProvider from "../../context/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/SessionAuthProvider";

const CheckoutPage = () => {
    const { state: authState } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authState.token) {
            router.push("/login");
        }
        }, [authState.token, router]);

        if (!authState.token) {
        return router.push("/login");
        }

        if (!authState.role || authState.role !== "student") {
        return router.push("/products/list");
        }
  return (
      <CheckoutForm />
  );
};

export default CheckoutPage;
