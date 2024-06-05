"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import universityLogo from "/public/logo-icesi-blanco.png";
import uniLuchLogo from "/public/UniLunchLogo2.png";
import backgroundImage from "/public/backgroundImage.png";

const RegisterStudentPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [program, setProgram] = useState<string>("");
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
            lastname,
            email,
            password,
            dni,
            code,
            program,
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
    <div className="flex h-screen items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        <div className="hidden md:flex md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-700 p-4">
          <h1 className="text-4xl font-bold text-white m-0">UniLunch</h1>
          <p className="text-white mt-2 text-center m-0 justify-center">
            Regístrate como estudiante y comienza a disfrutar de nuestros servicios en la Universidad Icesi.
          </p>
          <Image src={universityLogo} alt="Logo Universidad Icesi" width={100} height={100} className="mt-4" />
        </div>
        <div className="flex flex-col items-center justify-center p-8 md:w-1/2 w-full m-0">
          <Image src={uniLuchLogo} alt="Logo UniLunch" width={200} height={200} />
          <h1 className="text-2xl font-bold mb-4 m-0">Registrar Estudiante</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-sm m-0">
            <div className="mb-4 m-0">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 m-0">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nombre"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-0"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-4 m-0">
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 m-0">
                Apellido
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Apellido"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-0"
                value={lastname}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div className="mb-4 m-0">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 m-0">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ej: correo@ejemplo.com"
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
                placeholder="Ej: UniLunch123"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-0"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="mb-4 m-0">
              <label htmlFor="dni" className="block text-sm font-medium text-gray-700 m-0">
                DNI
              </label>
              <input
                type="text"
                id="dni"
                name="dni"
                placeholder="DNI"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-0"
                value={dni}
                onChange={(event) => setDni(event.target.value)}
              />
            </div>
            <div className="mb-4 m-0">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 m-0">
                Código
              </label>
              <input
                type="text"
                id="code"
                name="code"
                placeholder="Código"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-0"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </div>
            <div className="mb-4 m-0">
              <label htmlFor="program" className="block text-sm font-medium text-gray-700 m-0">
                Programa
              </label>
              <input
                type="text"
                id="program"
                name="program"
                placeholder="Programa"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-0"
                value={program}
                onChange={(event) => setProgram(event.target.value)}
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

export default RegisterStudentPage;
