// REEMPLAZARLO POR EL VERDADERO
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NewsForm from '@/components/News/NewsForm';
import { useAuth } from "../../../context/SessionAuthProvider";

const EditNewsPage = () => {
  const { state: authState } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [initialData, setInitialData] = useState(null);

  const newsId = searchParams.get('id');

  useEffect(() => {
    const fetchNews = async () => {
      if (newsId) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/news/${newsId}`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        if (response.ok) {
          const news = await response.json();
          setInitialData(news);
        } else {
          setError('Failed to fetch news details');
        }
      }
    };

    fetchNews();
  }, [newsId, authState.token]);

  const handleSubmit = async (data: {
    title: string;
    content: string;
  }) => {
    setError("");

    if (!authState.token) {
      setError("You need to be logged in to edit news.");
      return;
    }

    if (!authState.role || authState.role !== "editor") {
      setError("You must be an editor to edit news.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/news/${newsId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to edit news");
      }

      // Redirigir a la lista de noticias después de editar exitosamente
      router.push("/news/list");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  // Si no hay token o el usuario no es editor, mostrar el mensaje de error en lugar del formulario
  if (!authState.token) {
    return <p>You need to be logged in to edit news.</p>;
  }

  if (!authState.role || authState.role !== "editor") {
    return <p>You must be an editor to edit news.</p>;
  }

  return (
    <div>
      <h1>Edit News</h1>
      {initialData ? (
        <NewsForm initialData={initialData} onSubmit={handleSubmit} />
      ) : (
        <p>Loading news details...</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default EditNewsPage;
