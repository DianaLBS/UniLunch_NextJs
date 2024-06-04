"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../context/SessionAuthProvider";
import { useNews } from "../context/NewContext";

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
    description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters")
        .max(150, "Description must be less than 150 characters"),
    image: Yup.string().url("Invalid URL"),
});

const AddNewForm = () => {
    const { dispatch } = useNews();
    const { state: authState } = useAuth();
    const {
     register,
     handleSubmit,
     formState: { errors },
     reset
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: any) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/news`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authState.token}`,
        },
            body: JSON.stringify(data),
        });

        if(response.ok){
            const news = await response.json();
            dispatch({ type: "ADD_NEW", payload: news });
            reset();
        }else{
            console.error("Failed to add news");
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Add New</h2>
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
        <button type="submit">Add New</button>
      </form>  
    );
};

export default AddNewForm;

