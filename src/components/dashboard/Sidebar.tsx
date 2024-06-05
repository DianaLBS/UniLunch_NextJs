"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillHome, AiFillShopping, AiFillFileText, AiFillTags, AiFillSetting, AiOutlineMenu, AiOutlineClose, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import uniLunchLogo from "/public/UniLunchLogo.png";

const Sidebar = ({ role }: { role: string }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubMenu = (label: string) => {
    setOpenSubMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const commonLinks = [
    { href: '/dashboard', label: 'Inicio', icon: <AiFillHome />, subLinks: [] },
    { href: '/reports', label: 'Reportes', icon: <AiFillFileText />, subLinks: [
      { href: '/reports/view', label: 'Ver Reportes' },
      { href: '/reports/create', label: 'Crear Reporte' }
    ]},
    { href: '/announcements', label: 'Novedades', icon: <AiFillTags />, subLinks: [
      { href: '/announcements/list', label: 'Ver Novedades' },
      { href: '/announcements/add', label: 'Crear Novedad' }
    ]}
  ];

  const studentLinks = [
    ...commonLinks,
    { href: '/products', label: 'Productos', icon: <AiFillShopping />, subLinks: [
      { href: '/products/list', label: 'Ver Productos' },
    ]},
    { href: '/sales', label: 'Ventas', icon: <AiFillSetting />, subLinks: [
      { href: '/sales/view', label: 'Ver Ventas' },
      { href: '/sales/create', label: 'Crear Venta' }
    ]}
  ];

  const restaurantLinks = [
    ...commonLinks,
    { href: '/products', label: 'Productos', icon: <AiFillShopping />, subLinks: [
      { href: '/products/list', label: 'Ver Productos' },
      { href: '/products/add', label: 'Crear Producto' }
    ]}
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
          <div key={link.href}>
            <div className="flex justify-between items-center text-white p-4 flex items-center hover:bg-gray-700 no-underline cursor-pointer" onClick={() => toggleSubMenu(link.label)}>
              <div className="flex items-center">
                {link.icon}
                {isOpen && <span className="ml-2">{link.label}</span>}
              </div>
              {isOpen && (openSubMenus[link.label] ? <AiFillCaretUp /> : <AiFillCaretDown />)}
            </div>
            {isOpen && openSubMenus[link.label] && (
              <div className="pl-8">
                {link.subLinks.map((subLink) => (
                  <Link key={subLink.href} href={subLink.href} legacyBehavior>
                    <a className="text-white p-4 flex items-center hover:bg-gray-700 no-underline">
                      <span className="ml-2">{subLink.label}</span>
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
