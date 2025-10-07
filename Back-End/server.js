const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Configuración de CORS
app.use(cors({
  origin: [
    'https://incredicol.netlify.app',
    'http://localhost:4200',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());

// Conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://acevedodarwin599_db_user:Darwin-2906@incredicol.zwscbes.mongodb.net/incredicol';

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('✅ Conexión exitosa a MongoDB Atlas');
})
.catch((err) => {
  console.error('❌ Error al conectar a MongoDB Atlas:', err);
});

// Modelo Solicitud
const Solicitud = require('./solicitud');

// Rutas
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Incredicol funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Crear solicitud
app.post('/solicitudes', async (req, res) => {
  try {
    const solicitud = new Solicitud(req.body);
    await solicitud.save();
    res.status(201).json({
      success: true,
      data: solicitud,
      message: 'Solicitud creada exitosamente'
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Listar solicitudes
app.get('/solicitudes', async (req, res) => {
  try {
    const solicitudes = await Solicitud.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: solicitudes.length,
      data: solicitudes
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
});

// ✅ MANEJO DE RUTAS NO ENCONTRADAS - VERSIÓN SEGURA
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`
  });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});