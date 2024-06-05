"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AiOutlineFileText, AiOutlineDollar, AiOutlineStock, AiOutlinePicture } from 'react-icons/ai';

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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Agregar Producto</h2>
      <div className="flex items-center space-x-4">
        <AiOutlineFileText size={24} />
        <input
          type="text"
          placeholder="Nombre"
          {...register("name")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      
      <div className="flex items-center space-x-4">
        <AiOutlineFileText size={24} />
        <textarea
          placeholder="Descripción"
          {...register("description")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <div className="flex items-center space-x-4">
        <AiOutlineDollar size={24} />
        <input
          type="number"
          placeholder="Precio"
          {...register("price")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

      <div className="flex items-center space-x-4">
        <AiOutlineStock size={24} />
        <input
          type="number"
          placeholder="Stock"
          {...register("stock")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}

      <div className="flex items-center space-x-4">
        <AiOutlinePicture size={24} />
        <input
          type="text"
          placeholder="URL de la Imagen"
          {...register("image")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Agregar Producto
      </button>
    </form>
  );
};

export default ProductForm;
