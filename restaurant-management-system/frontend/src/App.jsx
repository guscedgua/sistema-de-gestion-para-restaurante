import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Luego aquí agregas más rutas como /menu, /cart, etc */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
cd