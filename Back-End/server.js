const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Configuración de CORS para producción
app.use(cors({
  origin: [
    'https://incredicol.netlify.app',
    'https://incredicol.netlify.app/', // Reemplaza con tu URL real de Netlify
    'http://localhost:4200',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://acevedodarwin599_db_user:Darwin-2906@incredicol.zwscbes.mongodb.net/incredicol';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conexión exitosa a MongoDB Atlas');
})
.catch((err) => {
  console.error('❌ Error al conectar a MongoDB Atlas:', err);
});

// Modelo Solicitud
const Solicitud = require('./solicitud');

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Incredicol funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta de health check para Render
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Crear solicitud
app.post('/solicitudes', async (req, res) => {
  try {
    console.log('📝 Creando nueva solicitud:', req.body);
    const solicitud = new Solicitud(req.body);
    await solicitud.save();
    res.status(201).json({
      success: true,
      data: solicitud,
      message: 'Solicitud creada exitosamente'
    });
  } catch (error) {
    console.error('❌ Error creando solicitud:', error);
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
    console.error('❌ Error obteniendo solicitudes:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
});

// Obtener una solicitud por ID
app.get('/solicitudes/:id', async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);
    if (!solicitud) {
      return res.status(404).json({
        success: false,
        error: 'Solicitud no encontrada'
      });
    }
    res.json({
      success: true,
      data: solicitud
    });
  } catch (error) {
    console.error('❌ Error obteniendo solicitud:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`
  });
});

// Manejo global de errores
app.use((error, req, res, next) => {
  console.error('🔥 Error no manejado:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'production' ? {} : error.stack
  });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 MongoDB: ${mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado'}`);
});

// Manejo graceful shutdown
process.on('SIGINT', () => {
  console.log('🛑 Apagando servidor gracefulmente...');
  server.close(() => {
    mongoose.connection.close();
    console.log('✅ Servidor apagado correctamente');
    process.exit(0);
  });
});

module.exports = app;