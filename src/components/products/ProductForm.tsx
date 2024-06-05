"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string()
    .required("La descripción es requerida")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(150, "La descripción debe tener menos de 150 caracteres"),
  price: Yup.number().required("El precio es requerido").positive("El precio debe ser un número positivo"),
  stock: Yup.number().required("El stock es requerido").positive("El stock debe ser un número positivo"),
  image: Yup.string().url("URL inválida").optional(),
});

interface ProductFormProps {
  initialData?: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image?: string;
  };
  onSubmit: (data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image?: string;
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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-gray-100 p-4 rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Nombre</label>
        <input
          type="text"
          placeholder="Nombre"
          {...register("name")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Descripción</label>
        <textarea
          placeholder="Descripción"
          {...register("description")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <p className="text-red-500 text-sm">{errors.description?.message}</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Precio</label>
        <input
          type="number"
          placeholder="Precio"
          {...register("price")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <p className="text-red-500 text-sm">{errors.price?.message}</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Stock</label>
        <input
          type="number"
          placeholder="Stock"
          {...register("stock")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <p className="text-red-500 text-sm">{errors.stock?.message}</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">URL de la Imagen (opcional)</label>
        <input
          type="text"
          placeholder="URL de la Imagen"
          {...register("image")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <p className="text-red-500 text-sm">{errors.image?.message}</p>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
        {initialData ? 'Actualizar Producto' : 'Agregar Producto'}
      </button>
    </form>
  );
};

export default ProductForm;
