"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(150, "Description must be less than 150 characters"),
  image: Yup.string().url("Invalid URL"),
});

interface NewFormProps {
  initialData?: {
    title: string;
    description: string;
    image: string;
  };
  onSubmit: (data: {
    title: string;
    description: string;
    image: string;
  }) => void;
}

const NewForm: React.FC<NewFormProps> = ({ initialData, onSubmit }) => {
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
        <input type="text" placeholder="Title" {...register("title")} />
        <p>{errors.title?.message}</p>
      </div>
      <div>
        <textarea placeholder="Description" {...register("description")} />
        <p>{errors.description?.message}</p>
      </div>
      <div>
        <input type="text" placeholder="Image URL" {...register("image")} />
        <p>{errors.image?.message}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewForm;