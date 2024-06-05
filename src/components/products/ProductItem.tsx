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
    dispatch({type:"SHOW_CART"});
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
      console.error("Failed to delete product");
    }
  };

  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>Stock: {product.stock}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {authState.role === "restaurant" && (
        <>
          <Link href={`/products/edit/${product.id}`} passHref>
            Edit
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default ProductItem;
