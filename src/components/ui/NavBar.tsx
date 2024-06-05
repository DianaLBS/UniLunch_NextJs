"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaHome, FaSignInAlt, FaUserPlus, FaUtensils, FaSignOutAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-6 items-center">
          <span className="text-white font-bold text-xl flex items-center">
            <FaUtensils className="mr-2" /> UniLunch
          </span>
          <Link href="/" legacyBehavior>
            <a className="text-white font-medium hover:text-blue-400 no-underline flex items-center">
              <FaHome className="mr-1" /> Inicio
            </a>
          </Link>
        </div>
        <div className="flex space-x-6 items-center">
          {session?.user.role === "restaurant" && (
            <Link href="/products/add" legacyBehavior>
              <a className="text-white font-medium hover:text-blue-400 no-underline flex items-center">
                <IoMdAdd /> Add Product
              </a>
            </Link>
          )}

          {session?.user ? (
            <button onClick={() => signOut()} className="bg-black-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600 flex items-center">
              <FaSignOutAlt className="mr-1" /> Cerrar sesión
            </button>
          ) : (
            <>
              <Link href="/login" legacyBehavior>
                <a className="text-white font-medium hover:text-blue-400 no-underline flex items-center">
                  <FaSignInAlt className="mr-1" /> Iniciar sesión
                </a>
              </Link>
              <Link href="/register/restaurant" legacyBehavior>
                <a className="text-white font-medium hover:text-blue-400 no-underline flex items-center">
                  <FaUserPlus className="mr-1" /> Registrar como Restaurante
                </a>
              </Link>
              <Link href="/register/student" legacyBehavior>
                <a className="text-white font-medium hover:text-blue-400 no-underline flex items-center">
                  <FaUserPlus className="mr-1" /> Registrar como Estudiante
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
