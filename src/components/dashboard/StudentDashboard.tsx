import React from 'react';
import NavBar from '../NavBar';
import Sidebar from './Sidebar';
import ProfileSection from './ProfileSection';

const StudentDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar role="student" />
        <div className="flex-1 p-4 flex">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Bienvenido Estudiante</h1>
            <p>Aquí encontrarás todas las herramientas para gestionar tus compras y ver novedades.</p>
          </div>
          <ProfileSection />
        </div>
      </div>
  );
};

export default StudentDashboard;
