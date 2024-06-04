import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NewForm from "../../../components/NewForm";
import { useAuth } from "../../../context/SessionAuthProvider";

const AddNewPage = () => {
  const { state: authState } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (data: {
    title: string;
    description: string;
    image: string;
  }) => {
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add new");
      }

      // Redirigir a la lista de novedades después de añadir exitosamente
      router.push("/news/list");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  //Cambiar por otro tipo de formulario. 
  return (
    <div>
      <h1>Add New</h1>

      <NewForm onSubmit={handleSubmit} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddNewPage;