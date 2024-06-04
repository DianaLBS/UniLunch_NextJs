"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaHome, FaSignInAlt, FaUserPlus, FaUtensils, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-500 to-indigo-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-6 items-center">
            <span className="text-white font-bold text-xl flex items-center">
              <FaUtensils className="mr-2" /> UniLunch
            </span>
            
            {session?.user && (
            <Link href="/dashboard" className="text-white font-medium hover:text-blue-400 no-underline flex items-center">
              <FaTachometerAlt className="mr-1" /> Panel
            </Link>
            )}
          </div>
          <div className="flex space-x-6 items-center">
            {session?.user ? (
              <button onClick={() => signOut()} className="bg-black-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600 flex items-center">
                <FaSignOutAlt className="mr-1" /> Cerrar sesión
              </button>
            ) : (
              <>
                <Link href="/login" className="text-white font-medium hover:text-blue-400 no-underline flex items-center">
                  <FaSignInAlt className="mr-1" /> Iniciar sesión
                </Link>
                <Link href="/register/restaurant" className="text-white font-medium hover:text-blue-400 no-underline flex items-center">
                  <FaUserPlus className="mr-1" /> Registrar como Restaurante
                </Link>
                <Link href="/register/student" className="text-white font-medium hover:text-blue-400 no-underline flex items-center">
                  <FaUserPlus className="mr-1" /> Registrar como Estudiante
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;