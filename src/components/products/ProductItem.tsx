"use client";
import React from "react";
import { Product, useProducts } from "../../context/ProductContext";
import { useAuth } from "../../context/SessionAuthProvider";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { AiFillEdit, AiFillDelete, AiFillShopping } from "react-icons/ai";

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
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200 m-4">
      <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 truncate">{product.name}</div>
        <p className="text-gray-700 text-base truncate">{product.description}</p>
        <p className="text-gray-900 font-bold mt-2">${product.price}</p>
        {authState.role === "student" && (
          <div className="mt-4">
            <p className="text-gray-600">Stock: {product.stock}</p>
            <button 
              onClick={handleAddToCart} 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center w-full justify-center"
            >
              <AiFillShopping className="mr-2" /> Agregar al carrito
            </button>
          </div>
        )}
        {authState.role === "restaurant" && (
          <div className="flex space-x-2 mt-4">
            <Link href={`/products/edit/${product.id}`} legacyBehavior passHref>
              <a className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center w-full">
                <AiFillEdit className="mr-2" /> Editar
              </a>
            </Link>
            <button 
              onClick={handleDelete} 
              className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center justify-center w-full"
            >
              <AiFillDelete className="mr-2" /> Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
