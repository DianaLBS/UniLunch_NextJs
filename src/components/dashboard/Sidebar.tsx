import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillHome, AiFillShopping, AiFillFileText, AiFillTags, AiFillSetting, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import uniLunchLogo from "/public/UniLunchLogo.png";

const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(true);

  const commonLinks = [
    { href: '/dashboard', label: 'Inicio', icon: <AiFillHome /> },
    { href: '/dashboard/reports', label: 'Reportes', icon: <AiFillFileText /> },
    { href: '/dashboard/announcements', label: 'Novedades', icon: <AiFillTags /> }
  ];

  const studentLinks = [
    ...commonLinks,
    { href: '/dashboard/products', label: 'Productos', icon: <AiFillShopping /> },
    { href: '/dashboard/sales', label: 'Ventas', icon: <AiFillSetting /> }
  ];

  const restaurantLinks = [
    ...commonLinks,
    { href: '/dashboard/products', label: 'Productos', icon: <AiFillShopping /> }
  ];

  const links = role === 'student' ? studentLinks : restaurantLinks;

  return (
    <div className={`bg-gray-900 text-white h-full flex flex-col ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300 rounded-tr-lg rounded-br-lg`}>
      <div className="flex items-center justify-between p-4">
        {isOpen && <h1 className="text-xl font-bold">UniLunch</h1>}
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>
      <div className="flex items-center justify-center mb-4">
        <Image src={uniLunchLogo} alt="Logo UniLunch" width={isOpen ? 200 : 60} height={isOpen ? 200 : 60} className="transition-all duration-300" />
      </div>
      <div className="flex-1 flex flex-col">
        {links.map((link) => (
          <Link key={link.href} href={link.href} legacyBehavior>
            <a className="text-white p-4 flex items-center hover:bg-gray-700 no-underline">
              {link.icon}
              {isOpen && <span className="ml-2">{link.label}</span>}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
