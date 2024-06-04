"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../context/SessionAuthProvider";
import { useProducts } from "../context/ProductContext";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(150, "Description must be less than 150 characters"),
  price: Yup.number().required("Price is required").positive("Price must be positive"),
  stock: Yup.number().required("Stock is required").positive("Stock must be positive"),
  image: Yup.string().url("Invalid URL"),
});

const AddProductForm = () => {
  const { dispatch } = useProducts();
  const { state: authState } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authState.token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const product = await response.json();
      dispatch({ type: "ADD_PRODUCT", payload: product });
      reset();
    } else {
      console.error("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Product</h2>
      <div>
        <input type="text" placeholder="Name" {...register("name")} />
        <p>{errors.name?.message}</p>
      </div>
      <div>
        <textarea placeholder="Description" {...register("description")} />
        <p>{errors.description?.message}</p>
      </div>
      <div>
        <input type="number" placeholder="Price" {...register("price")} />
        <p>{errors.price?.message}</p>
      </div>
      <div>
        <input type="number" placeholder="Stock" {...register("stock")} />
        <p>{errors.stock?.message}</p>
      </div>
      <div>
        <input type="text" placeholder="Image URL" {...register("image")} />
        <p>{errors.image?.message}</p>
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
