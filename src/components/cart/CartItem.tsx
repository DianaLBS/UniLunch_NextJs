"use client";
import React from "react";
import { CartItem as CartItemType, useCart } from "../../context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { dispatch } = useCart();

  const handleRemove = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item.productId });
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    if (quantity > 0) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId: item.productId, quantity } });
    }
  };

  return (
    <div className="cart-item">
      <h2>{item.name}</h2>
      <p>${item.price}</p>
      <input
        type="number"
        value={item.quantity}
        onChange={handleChangeQuantity}
      />
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default CartItem;
