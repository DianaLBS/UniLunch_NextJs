"use client";

import React from "react";
import { New } from "../context/NewContext";
import { useAuth } from "@/context/SessionAuthProvider";
import { useNews } from "@/context/NewContext";
import Link from "next/link";

const NewItem = ({ news }: { news: New }) => {
  const { state: authState } = useAuth();
  const { dispatch } = useNews();

  const handleDelete = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/news/${news.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${authState.token}`,
      },
    });

    if (response.ok) {
      dispatch({ type: "DELETE_NEW", payload: news.id });
    } else {
      console.error("Failed to delete new");
    }
  };

  return (
    <div className="new-item">
      <img src={news.image} alt={news.title} />
      <h2>{news.title}</h2>
      <p>{news.description}</p>
      {authState.role === "restaurant" && (
        <>
           <Link href={`/news/edit/${news.id}`} passHref>
            Edit
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default NewItem;
