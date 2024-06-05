"use client";
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { AiOutlineEdit, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';

const ProfileSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative rounded-tr-lg rounded-br-lg">
      <button
        className="flex items-center p-4 bg-gray-900 text-white hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AiOutlineUser className="mr-2" />
        Perfil
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
            onClick={() => console.log('Editar Perfil')}
          >
            <AiOutlineEdit className="mr-2" /> Editar Perfil
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
            onClick={() => signOut()}
          >
            <AiOutlineLogout className="mr-2" /> Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
