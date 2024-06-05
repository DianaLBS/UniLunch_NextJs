import React from 'react';
import NavBar from '../NavBar';
import Sidebar from './Sidebar';
import ProfileSection from './ProfileSection';

const RestaurantDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar role="restaurant" />
        <div className="flex-1 p-4 flex">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Bienvenido Restaurante</h1>
            <p>Aquí encontrarás todas las herramientas para gestionar tus productos y ventas.</p>
          </div>
          <ProfileSection />
        </div>
      </div>
  );
};

export default RestaurantDashboard;
