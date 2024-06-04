"use client"
import React from "react";
import { useSession } from "next-auth/react";
import ProductList from '../../components/products/ProductList'; // Ajusta la ruta según la estructura real de tu proyecto
import ProductForm from "../../components/ProductForm"; // Formulario para agregar o editar productos

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (!session) {
    return (
      <div>
        <h1>No estás autenticado</h1>
        <p>Por favor, inicia sesión para acceder a esta página.</p>
      </div>
    );
  }

  const userRole = session.user.role; // Asumiendo que el rol del usuario está en la sesión

  // Función para manejar la creación o edición de productos (sólo para restaurantes)
  const handleProductSubmit = (productData) => {
    console.log("Producto a procesar:", productData);
    // Aquí deberías añadir la lógica para enviar estos datos al backend
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Renderizar contenido basado en el rol del usuario */}
      {userRole === 'restaurant' ? (
        <>
          <ProductForm onSubmit={handleProductSubmit} />
          <ProductList />
        </>
      ) : userRole === 'student' ? (
        <ProductList />
      ) : (
        <p>No tienes permisos para ver esta página.</p>
      )}
    </div>
  );
};

export default Dashboard;
