"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import universityLogo from "/public/logo-icesi-blanco.png";
import uniLuchLogo from "/public/UniLunchLogo2.png";
import backgroundImage from "/public/backgroundImage.png";

const RegisterRestaurantPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nit, setNit] = useState<string>("");
  const [manager, setManager] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            nit,
            manager,
            phone,
          }),
        }
      );

      const responseAPI = await res.json();

      if (!res.ok) {
        setErrors([responseAPI.message || "Failed to register"]);
        return;
      }

      const responseNextAuth = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        setErrors(responseNextAuth.error.split(","));
        return;
      }

      router.push("/dashboard");
    } catch (error: any) {
      setErrors([error.message || "An unexpected error occurred"]);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-cover bg-center p-0" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden p-0 m-0">
        <div className="hidden md:flex md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-700 p-4">
          <h1 className="text-4xl font-bold text-white m-0">¡Únete a UniLunch!</h1>
          <p className="text-white mt-2 text-center m-0 justify-center">
            Registra tu restaurante y comienza a ofrecer tus servicios en la Universidad Icesi.
          </p>
          <Image src={universityLogo} alt="Logo Universidad Icesi" width={200} height={200} className="mt-4" />
        </div>
        <div className="flex flex-col items-center justify-center p-4 md:w-1/2 w-full m-4">
          <Image src={uniLuchLogo} alt="Logo UniLunch" width={100} height={100} className="mb-2" />
          <h1 className="text-2xl font-bold mb-4 m-0">Registrar Restaurante</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-sm m-0">
            <div className="mb-2 m-0">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 m-0">
                Nombre del Restaurante
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nombre del Restaurante"
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-0"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-2 m-0">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 m-0">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ej: correo@ejemplo.com"
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-0"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-2 m-0">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 m-0">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ej: UniLunch123"
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-0"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="mb-2 m-0">
              <label htmlFor="nit" className="block text-sm font-medium text-gray-700 m-0">
                NIT
              </label>
              <input
                type="text"
                id="nit"
                name="nit"
                placeholder="NIT del Restaurante"
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-0"
                value={nit}
                onChange={(event) => setNit(event.target.value)}
              />
            </div>
            <div className="mb-2 m-0">
              <label htmlFor="manager" className="block text-sm font-medium text-gray-700 m-0">
                Nombre del Gerente
              </label>
              <input
                type="text"
                id="manager"
                name="manager"
                placeholder="Nombre del Gerente"
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-0"
                value={manager}
                onChange={(event) => setManager(event.target.value)}
              />
            </div>
            <div className="mb-2 m-0">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 m-0">
                Teléfono
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Teléfono"
                className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-0"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-0"
            >
              Registrar
            </button>
          </form>

          {errors.length > 0 && (
            <div className="mt-4 p-4 border border-red-500 bg-red-100 text-red-700 rounded m-0">
              <ul className="list-disc list-inside m-0">
                {errors.map((error) => (
                  <li key={error} className="m-0">{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterRestaurantPage;
