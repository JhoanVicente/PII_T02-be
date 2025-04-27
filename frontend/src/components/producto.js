import React, { useState, useEffect } from 'react';
import { getProductos, createProducto, deleteProducto } from '../services/api';

export default function Producto() {
     const [productos, setProductos] = useState([]);
     const [nombre, setNombre] = useState('');
     const [precio, setPrecio] = useState('');
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
          cargarProductos();
     }, []);

     const cargarProductos = async () => {
          try {
               setLoading(true);
               const response = await getProductos();
               setProductos(response.data);
               setLoading(false);
          } catch (err) {
               setError('Error al cargar los productos');
               setLoading(false);
          }
     };

     const handleAgregarProducto = async (e) => {
          e.preventDefault();
          try {
               await createProducto({ nombre, precio });
               await cargarProductos();
               setNombre('');
               setPrecio('');
          } catch (err) {
               setError('Error al agregar el producto');
          }
     };

     const handleEliminarProducto = async (id) => {
          try {
               await deleteProducto(id);
               await cargarProductos();
          } catch (err) {
               setError('Error al eliminar el producto');
          }
     };

     if (loading) return <div className="py-4 text-center">Cargando...</div>;
     if (error) return <div className="py-4 text-center text-red-500">{error}</div>;

     return (
          <div className="max-w-2xl p-4 mx-auto">
               <h1 className="mb-4 text-2xl font-bold text-center">CRUD Productos</h1>

               <form onSubmit={handleAgregarProducto} className="flex gap-2 mb-4">
                    <input
                         type="text"
                         placeholder="Nombre"
                         className="w-full p-2 border rounded"
                         value={nombre}
                         onChange={(e) => setNombre(e.target.value)}
                         required
                    />
                    <input
                         type="number"
                         placeholder="Precio"
                         className="w-full p-2 border rounded"
                         value={precio}
                         onChange={(e) => setPrecio(e.target.value)}
                         required
                    />
                    <button
                         type="submit"
                         className="p-2 text-white transition-colors bg-pink-700 rounded hover:bg-pink-800"
                    >
                         Agregar
                    </button>
               </form>

               {productos.length === 0 ? (
                    <p className="py-4 text-center text-gray-500">No hay productos registrados</p>
               ) : (
                    <ul className="space-y-2">
                         {productos.map((p) => (
                              <li key={p.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                   <span>
                                        <span className="font-medium">{p.nombre}</span> - S/.{p.precio}
                                   </span>
                                   <button
                                        onClick={() => handleEliminarProducto(p.id)}
                                        className="p-1 px-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                                   >
                                        Eliminar
                                   </button>
                              </li>
                         ))}
                    </ul>
               )}
          </div>
     );
}
