import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/menu'); // Redirige al menú si el login es exitoso
    } catch (error) {
      console.error(error.response.data.message || error.message);
      alert('Login fallido. Verifica tus datos.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded"
        />
        
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 border rounded"
        />
        
        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
