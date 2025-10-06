const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  email: { type: String, required: true },
  monto: { type: Number, required: true },
  comentario: { type: String }, // opcional
  puntuacion: { type: Number, required: true, min: 0, max: 5 },
  simulador: { type: String, required: true }
});

module.exports = mongoose.model('Solicitud', solicitudSchema);
