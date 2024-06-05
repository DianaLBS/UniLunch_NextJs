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
    <div className="p-4 bg-white rounded-lg shadow-md mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold">{item.name}</h2>
        <p className="text-gray-700">${item.price}</p>
        <input
          type="number"
          value={item.quantity}
          onChange={handleChangeQuantity}
          className="w-16 p-1 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={handleRemove}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
