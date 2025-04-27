import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
     return (
          <nav className="bg-white shadow-lg">
               <div className="max-w-6xl px-4 mx-auto">
                    <div className="flex justify-between">
                         <div className="flex space-x-7">
                              <div>
                                   <Link to="/" className="flex items-center px-2 py-4">
                                        <span className="text-lg font-semibold text-blue-600">Productos CRUD</span>
                                   </Link>
                              </div>
                              <div className="items-center hidden space-x-1 md:flex">
                                   <Link
                                        to="/"
                                        className="px-2 py-4 font-semibold text-gray-600 transition duration-300 hover:text-blue-600"
                                   >
                                        Inicio
                                   </Link>
                                   <Link
                                        to="/productos"
                                        className="px-2 py-4 font-semibold text-gray-600 transition duration-300 hover:text-blue-600"
                                   >
                                        Productos
                                   </Link>
                                   <Link
                                        to="/agregar"
                                        className="px-2 py-4 font-semibold text-gray-600 transition duration-300 hover:text-blue-600"
                                   >
                                        Agregar Producto
                                   </Link>
                              </div>
                         </div>
                         <div className="items-center hidden space-x-3 md:flex">
                              <Link
                                   to="/login"
                                   className="px-3 py-2 font-medium text-gray-600 transition duration-300 rounded hover:bg-blue-100 hover:text-blue-700"
                              >
                                   Iniciar Sesión
                              </Link>
                              <Link
                                   to="/registro"
                                   className="px-3 py-2 font-medium text-white transition duration-300 bg-blue-600 rounded hover:bg-blue-700"
                              >
                                   Registrarse
                              </Link>
                         </div>
                         <div className="flex items-center md:hidden">
                              <button className="outline-none mobile-menu-button">
                                   <svg
                                        className="w-6 h-6 text-gray-600 hover:text-blue-600"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                   >
                                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                                   </svg>
                              </button>
                         </div>
                    </div>
               </div>
               <div className="hidden mobile-menu">
                    <ul>
                         <li>
                              <Link
                                   to="/"
                                   className="block px-2 py-4 text-sm font-medium text-white bg-blue-600"
                              >
                                   Inicio
                              </Link>
                         </li>
                         <li>
                              <Link
                                   to="/productos"
                                   className="block px-2 py-4 text-sm text-gray-600 transition duration-300 hover:bg-blue-50 hover:text-blue-600"
                              >
                                   Productos
                              </Link>
                         </li>
                         <li>
                              <Link
                                   to="/agregar"
                                   className="block px-2 py-4 text-sm text-gray-600 transition duration-300 hover:bg-blue-50 hover:text-blue-600"
                              >
                                   Agregar Producto
                              </Link>
                         </li>
                    </ul>
               </div>
          </nav>
     );
}
