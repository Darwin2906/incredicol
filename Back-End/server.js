const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://acevedodarwin599_db_user:Darwin-2906@incredicol.zwscbes.mongodb.net/incredicol')
  .then(() => {
    console.log('✅ Conexión exitosa a MongoDB Atlas');
  })
  .catch((err) => {
    console.error('❌ Error al conectar a MongoDB Atlas:', err);
  });

// Modelo Solicitud
const Solicitud = require('./solicitud');

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});


// Crear solicitud
app.post('/solicitudes', async (req, res) => {
  try {
    const solicitud = new Solicitud(req.body);
    await solicitud.save();
    res.status(201).json(solicitud);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar solicitudes
app.get('/solicitudes', async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});