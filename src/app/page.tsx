import React from "react";
import ButtonAuth from "../components/ui/ButtonAuth";
import Image from "next/image";
import { FaUtensils, FaQrcode, FaUserFriends, FaMobileAlt } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen p-4">
      <header className="text-center text-gray-800 py-8">
        <h1 className="text-5xl font-bold mb-4">Bienvenido a UniLunch</h1>
        <p className="text-xl mb-4">
          La manera más fácil y rápida de gestionar tus almuerzos en la Universidad Icesi.
        </p>
        <ButtonAuth />
      </header>
      
      <main className="container mx-auto px-4">
        <section className="text-gray-800 text-center py-8">
          <h2 className="text-3xl font-bold mb-4">¿Qué es UniLunch?</h2>
          <p className="text-lg mb-8">
            UniLunch es una aplicación diseñada para facilitar el proceso de compra de almuerzos en la universidad. Con nuestro sistema de pagos por QR y opciones personalizadas, nunca ha sido tan fácil disfrutar de tus comidas favoritas.
          </p>
          <Image src="/RefRetaurante.png" alt="UniLunch" width={600} height={400} className="mx-auto rounded-lg shadow-lg" />
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Características</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-gray-800">
              <FaUtensils className="mx-auto text-6xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Variedad de Comidas</h3>
              <p>Accede a un amplio menú con diversas opciones de comidas para todos los gustos.</p>
            </div>
            <div className="text-center text-gray-800">
              <FaQrcode className="mx-auto text-6xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Pago con QR</h3>
              <p>Paga de manera rápida y segura utilizando códigos QR.</p>
            </div>
            <div className="text-center text-gray-800">
              <FaUserFriends className="mx-auto text-6xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Registro Sencillo</h3>
              <p>Regístrate fácilmente como estudiante o restaurante.</p>
            </div>
            <div className="text-center text-gray-800">
              <FaMobileAlt className="mx-auto text-6xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Acceso Móvil</h3>
              <p>Usa la aplicación en cualquier dispositivo móvil.</p>
            </div>
          </div>
        </section>

        <section className="text-gray-800 text-center py-8">
          <h2 className="text-3xl font-bold mb-4">¿Cómo Funciona?</h2>
          <p className="text-lg mb-8">
            Simplemente regístrate, selecciona tu almuerzo favorito, paga con QR y disfruta de una experiencia sin complicaciones.
          </p>
          <Image src="/RefRetaurante2.png" alt="How it works" width={600} height={400} className="mx-auto rounded-lg shadow-lg" />
        </section>
      </main>

      <footer className="text-center text-gray-800 py-8">
        <p className="text-sm">&copy; 2024 UniLunch. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
