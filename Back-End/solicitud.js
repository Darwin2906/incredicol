const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  apellidos: { 
    type: String, 
    required: [true, 'Los apellidos son obligatorios'],
    trim: true,
    minlength: [2, 'Los apellidos deben tener al menos 2 caracteres'],
    maxlength: [80, 'Los apellidos no pueden exceder 80 caracteres']
  },
  email: { 
    type: String, 
    required: [true, 'El email es obligatorio'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingresa un email válido']
  },
  monto: { 
    type: Number, 
    required: [true, 'El monto es obligatorio'],
    min: [1000, 'El monto mínimo es $1,000'],
    max: [1000000, 'El monto máximo es $1,000,000']
  },
  comentario: { 
    type: String,
    trim: true,
    maxlength: [500, 'El comentario no puede exceder 500 caracteres']
  },
  puntuacion: { 
    type: Number, 
    required: [true, 'La puntuación es obligatoria'],
    min: [0, 'La puntuación mínima es 0'],
    max: [5, 'La puntuación máxima es 5'],
    validate: {
      validator: Number.isInteger,
      message: 'La puntuación debe ser un número entero'
    }
  },
  simulador: { 
    type: String, 
    required: [true, 'El tipo de simulador es obligatorio'],
    trim: true
  }
}, {
  timestamps: true
});

// Índices para mejorar performance
solicitudSchema.index({ email: 1 });
solicitudSchema.index({ createdAt: -1 });
solicitudSchema.index({ simulador: 1 });

// Método para formatear la salida JSON
solicitudSchema.methods.toJSON = function() {
  const solicitud = this.toObject();
  solicitud.id = solicitud._id;
  delete solicitud._id;
  delete solicitud.__v;
  return solicitud;
};

module.exports = mongoose.model('Solicitud', solicitudSchema);