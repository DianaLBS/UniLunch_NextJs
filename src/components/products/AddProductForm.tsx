"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../context/SessionAuthProvider";
import { useProducts } from "../../context/ProductContext";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  description: Yup.string()
    .required("La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(150, "La descripción debe tener menos de 150 caracteres"),
  price: Yup.number().required("El precio es obligatorio").positive("El precio debe ser positivo"),
  stock: Yup.number().required("El stock es obligatorio").positive("El stock debe ser positivo"),
  image: Yup.string().url("URL inválida"),
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
        Authorization: `Bearer ${authState.token}`,
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
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            {...register("name")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            placeholder="Descripción"
            {...register("description")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Precio</label>
          <input
            type="number"
            placeholder="Precio"
            {...register("price")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <p className="text-red-500 text-sm">{errors.price?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            placeholder="Stock"
            {...register("stock")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <p className="text-red-500 text-sm">{errors.stock?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">URL de la Imagen</label>
          <input
            type="text"
            placeholder="URL de la Imagen"
            {...register("image")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <p className="text-red-500 text-sm">{errors.image?.message}</p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Agregar Producto
        </button>
      </form>
  );
};

export default AddProductForm;
