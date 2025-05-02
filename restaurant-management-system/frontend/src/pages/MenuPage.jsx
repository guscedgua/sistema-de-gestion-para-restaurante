import { useState, useEffect } from 'react';
import axios from 'axios';

const MenuPage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products') // ← tu endpoint real
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error al cargar menú', err));
  }, []);

  const categorias = ['Todos', 'Entradas', 'Platos principales', 'Postres', 'Bebidas'];

  const productosFiltrados = products.filter(
    (p) =>
      (filter === 'Todos' || p.category === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 bg-yellow-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-orange-600 text-center">Menú del Restaurante</h1>

      {/* Buscador */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="border p-2 rounded w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full border ${
              filter === cat ? 'bg-orange-500 text-white' : 'bg-white text-orange-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productosFiltrados.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
            <img
              src={product.image || 'https://via.placeholder.com/150'}
              alt={product.name}
              className="w-32 h-32 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold text-orange-700">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="text-lg font-bold mt-2 text-green-700">${product.price.toFixed(2)}</p>
            <button
              onClick={() => alert('Producto agregado')}
              className="mt-3 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
