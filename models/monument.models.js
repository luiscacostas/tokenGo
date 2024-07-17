const mongoose = require('mongoose');
require('../config/db_mongo');

const objSchema = {
  name: { 
    type: String, 
    required: true 
  },
  city: { 
    type: String, 
    required: true 
  },
  location: {
    type: { 
      type: String, 
      enum: ['Point'], 
      required: true 
    },
    coordinates: { 
      type: [Number], 
      required: true,
      unique: true 
    }
  },
  icon: { 
    type: String, 
    required: true 
  },
  isActive: {
    type: Boolean,
    default: true
  }
};

const MonumentSchema = mongoose.Schema(objSchema, { timestamps: true });

// Crear índice 2dsphere para consultas geoespaciales
MonumentSchema.index({ location: '2dsphere' });
MonumentSchema.index({ 'location.coordinates': 1 }, { unique: true });

const Monument = mongoose.model('Monument', MonumentSchema);

module.exports = Monument;


