"use client";
import React from "react";
import { Product, useProducts } from "../../context/ProductContext";
import { useAuth } from "../../context/SessionAuthProvider";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  const { state: authState } = useAuth();
  const { dispatch: productDispatch } = useProducts();
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    onAddToCart(product);
    dispatch({ type: "SHOW_CART" });
  };

  const handleDelete = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${product.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${authState.token}`,
      },
    });

    if (response.ok) {
      productDispatch({ type: "DELETE_PRODUCT", payload: product.id });
    } else {
      console.error("Error al eliminar el producto");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-between">
      <img src={product.image} alt={product.name} className="rounded-lg mb-4" />
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-gray-700 mb-2">${product.price}</p>
      {authState.role === "student" && (
        <>
          <p className="text-gray-700 mb-2">Stock: {product.stock}</p>
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Agregar al carrito
          </button>
        </>
      )}
      {authState.role === "restaurant" && (
        <div className="flex space-x-2 mt-4">
          <Link href={`/products/edit/${product.id}`} legacyBehavior passHref>
            <a className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition-colors duration-300">
              Editar
            </a>
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
