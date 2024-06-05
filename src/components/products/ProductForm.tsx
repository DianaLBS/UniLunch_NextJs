"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AiOutlineFileText, AiOutlineDollar, AiOutlineStock, AiOutlinePicture } from 'react-icons/ai';

// Definición del esquema de validación con Yup
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

// Definición de las props del componente ProductForm
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
  // Uso del hook useForm de react-hook-form con yupResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialData,
  });

  // Manejo del envío del formulario
  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-gray-700">Nombre</label>
        <div className="flex items-center space-x-2">
          <AiOutlineFileText size={24} />
          <input
            type="text"
            placeholder="Nombre"
            {...register("name")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      
      <div>
        <label className="block text-gray-700">Descripción</label>
        <div className="flex items-center space-x-2">
          <AiOutlineFileText size={24} />
          <textarea
            placeholder="Descripción"
            {...register("description")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700">Precio</label>
        <div className="flex items-center space-x-2">
          <AiOutlineDollar size={24} />
          <input
            type="number"
            placeholder="Precio"
            {...register("price")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700">Stock</label>
        <div className="flex items-center space-x-2">
          <AiOutlineStock size={24} />
          <input
            type="number"
            placeholder="Stock"
            {...register("stock")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700">URL de la Imagen</label>
        <div className="flex items-center space-x-2">
          <AiOutlinePicture size={24} />
          <input
            type="text"
            placeholder="URL de la Imagen"
            {...register("image")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
      </div>

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
