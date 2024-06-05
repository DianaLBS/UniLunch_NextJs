"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../context/SessionAuthProvider";
import { useProducts } from "../../context/ProductContext";
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

// Definición de las props del componente UpdateProductForm
interface UpdateProductFormProps {
  productId: string;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ productId }) => {
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
    } else {
      console.error("Failed to update product");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        Actualizar Producto
      </button>
    </form>
  );
};

export default UpdateProductForm;
