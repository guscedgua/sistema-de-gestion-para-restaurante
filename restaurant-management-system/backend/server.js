// Importar dependencias
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


// Importar rutas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');


// Inicializar app
dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // para leer datos JSON en body de peticiones

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);



// Página de prueba
app.get('/', (req, res) => {
  res.send('API de Restaurante funcionando ✅');
});

// Conectar a MongoDB y levantar servidor
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🟢 Conexión a MongoDB exitosa');
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
  })
  .catch((error) => console.error('🔴 Error de conexión a MongoDB:', error));
