"use client";
// Importaciones necesarias
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import universityLogo from "/public/logo-icesi-blanco.png";
import uniLunchLogo from "/public/UniLunchLogo2.png";
import backgroundImage from "/public/backgroundImage.png";

// Componente de la página de registro para estudiantes
const RegisterStudentPage = () => {
  // Estado para gestionar la información del formulario y errores
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [program, setProgram] = useState<string>("");
  const router = useRouter();

  // Función para manejar el envío del formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    try {
      // Envío de datos al backend para registro
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            lastname,
            email,
            password,
            dni,
            code,
            program,
          }),
        }
      );

      // Manejo de la respuesta
      const responseAPI = await res.json();
      if (!res.ok) {
        setErrors([responseAPI.message || "Failed to register"]);
        return;
      }

      // Intento de inicio de sesión después del registro
      const responseNextAuth = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        setErrors(responseNextAuth.error.split(","));
        return;
      }

      // Redirección al dashboard
      router.push("/dashboard");
    } catch (error: any) {
      setErrors([error.message || "An unexpected error occurred"]);
    }
  };
  
  return (
    <div className="flex h-screen items-center justify-center bg-cover bg-center p-0" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        <div className="hidden md:flex md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-700 p-4">
          <h1 className="text-4xl font-bold text-white m-0">UniLunch</h1>
          <p className="text-white mt-2 text-center m-0 justify-center">
            Regístrate como estudiante y comienza a disfrutar de nuestros servicios en la Universidad Icesi.
          </p>
          <Image src={universityLogo} alt="Logo Universidad Icesi" width={100} height={100} className="mt-4" />
        </div>
        <div className="flex flex-col items-center justify-center p-4 md:w-1/2 w-full m-0">
          <Image src={uniLunchLogo} alt="Logo UniLunch" width={100} height={100} className="mb-4" />
          <h1 className="text-2xl font-bold mb-4">Registrar Estudiante</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-xs">
            {['name', 'lastname', 'email', 'password', 'dni', 'code', 'program'].map((field) => (
              <div className="mb-3">
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  id={field}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  value={eval(field)}
                  onChange={(event) => eval(`set${field.charAt(0).toUpperCase() + field.slice(1)}`)(event.target.value)}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterStudentPage;
  