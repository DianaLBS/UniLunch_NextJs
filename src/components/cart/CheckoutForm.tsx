"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import QRCode from "qrcode.react";
import { useRouter } from "next/navigation";

const CheckoutForm: React.FC = () => {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const [qrData, setQrData] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("Cart state at checkout:", cartState);
  }, [cartState]);

  const handleCheckout = () => {
    if (cartState.cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const saleDetails = cartState.cartItems.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const payload = {
      saleDetails,
      totalValue: cartState.totalValue,
    };

    setQrData(JSON.stringify(payload));
  };

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      <p>Total: ${cartState.totalValue.toFixed(2)}</p>
      <button onClick={handleCheckout}>Generate QR</button>
      {qrData && (
        <div>
          <h3>Scan this QR to get your invoice</h3>
          <QRCode value={qrData} />
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
