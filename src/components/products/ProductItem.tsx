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
    <div className="product-item">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      {authState.role === "student" && (
        <>
      <p>Stock: {product.stock}</p>
      </>
      )}
      {authState.role === "student" && (
        <>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
      </>
      )}
      {authState.role === "restaurant" && (
        <div className="flex space-x-2 mt-4">
          <Link href={`/products/edit/${product.id}`} passHref>
            <a className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300">
              Editar
            </a>
          </Link>
          <button 
            onClick={handleDelete} 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
