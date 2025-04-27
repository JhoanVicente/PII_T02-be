// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Producto from './components/producto';
import ProductoForm from './components/ProductoForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container px-4 py-8 mx-auto">
          <Routes>
            <Route path="/" element={<Producto />} />
            <Route path="/productos" element={<Producto />} />
            <Route path="/agregar" element={<ProductoForm onProductoAdded={() => window.location.href = '/productos'} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
