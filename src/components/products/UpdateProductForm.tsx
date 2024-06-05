"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../context/SessionAuthProvider"; // Ajusta la ruta según tu proyecto
import { useProducts } from "../../context/ProductContext";
import { useRouter } from "next/navigation";

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

const UpdateProductForm = ({ productId }: { productId: string }) => {
  const { dispatch, state: { products } } = useProducts();
  const { state: authState } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const router = useRouter();

  useEffect(() => {
    // Cargar los datos del producto en el formulario
    const product = products.find(p => p.id === Number(productId));
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("stock", product.stock);
      setValue("image", product.image);
    }
  }, [productId, products, setValue]);

  const onSubmit = async (data: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authState.token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const updatedProduct = await response.json();
      dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
      reset();
      router.push("/products/list");
    } else {
      console.error("Failed to update product");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Update Product</h2>
      
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      
      <div className="flex items-center space-x-4">
        <textarea
          placeholder="Description"
          {...register("description")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <div className="flex items-center space-x-4">
        <input
          type="number"
          placeholder="Price"
          {...register("price")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

      <div className="flex items-center space-x-4">
        <input
          type="number"
          placeholder="Stock"
          {...register("stock")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Image URL"
          {...register("image")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Update Product
      </button>
    </form>
  );
};

export default UpdateProductForm;
