"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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

interface ProductFormProps {
  initialData?: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
  };
  onSubmit: (data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
  }) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;