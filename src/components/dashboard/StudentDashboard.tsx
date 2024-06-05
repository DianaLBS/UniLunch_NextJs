"use client";
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileSection from './ProfileSection';

const StudentDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar role="student" isOpen={isOpen} onToggle={handleToggleSidebar} />
      <div className={`flex-1 p-4 ${isOpen ? 'ml-64' : 'ml-20'} transition-margin duration-300`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Bienvenido Estudiante</h1>
          <ProfileSection />
        </div>
        <p>Aquí encontrarás todas las herramientas para gestionar tus compras y ver novedades.</p>
      </div>
    </div>
  );
};

export default StudentDashboard;
