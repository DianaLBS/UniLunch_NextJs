"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import universityLogo from "/public/logo-icesi-blanco.png"; 
import uniLunchLogo from "/public/UniLunchLogo2.png";
import backgroundImage from "/public/backgroundImage.png";

const LoginForm: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

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
  };

  return (
    <div className="flex h-screen items-center justify-center bg-cover bg-center m-0 p-0" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden m-0">
        <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-700 p-4">
          <h1 className="text-4xl font-bold text-white m-0">¡Bienvenido a UniLunch! </h1>
          <p className="text-white mt-5 text-justify m-0">
            Ingresa tus datos personales, selecciona tu almuerzo favorito y paga de manera rápida y sencilla con nuestro sistema de QR. ¡Disfruta de una experiencia sin complicaciones!
          </p>
          <p className="text-white mt-5 text-justify m-0">
           Software diseñado para uso exclusivo de la Universidad Icesi.
          </p>
          <div className="flex-grow"></div>
          <Image src={universityLogo} alt="Logo Universidad Icesi" width={100} height={100} className="mt-4" />
        </div>
        <div className="flex flex-col items-center justify-center p-8 md:w-1/2 w-full m-0">
          <Image src={uniLunchLogo} alt="Logo UniLuch" width={200} height={200} />
          <h1 className="text-2xl font-bold mb-4 m-0">Iniciar Sesión</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-sm m-0">
            <div className="mb-4 m-0">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 m-0">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ej:correo@ejemplo.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-0"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-4 m-0">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 m-0">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ej:UniLunch123"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-0"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-0"
            >
              Iniciar Sesión
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

export default LoginForm;