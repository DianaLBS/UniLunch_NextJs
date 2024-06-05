import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileSection from './ProfileSection';

const RestaurantDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar role="restaurant" isOpen={isOpen} onToggle={handleToggleSidebar} />
      <div className={`flex-1 p-4 ${isOpen ? 'ml-64' : 'ml-20'} transition-margin duration-300`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Bienvenido Restaurante</h1>
          <ProfileSection />
        </div>
        <p>Aquí encontrarás todas las herramientas para gestionar tus productos y ventas.</p>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
