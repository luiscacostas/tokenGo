const mongoose = require('mongoose');
require('../config/db_mongo');

const { Schema } = mongoose;

const objSchema = {
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  city: { 
    type: String, 
    required: [true, 'City is required'] 
  },
  location: {
    type: { 
      type: String, 
      enum: ['Point'], 
      required: [true, 'Location type is required'] 
    },
    coordinates: { 
      type: [Number], 
      required: [true, 'Coordinates are required'],
      unique: true 
    }
  },
  icon: { 
    type: String, 
    required: [true, 'Icon is required'] 
  },
  isActive: {
    type: Boolean,
    default: true
  }
};

const MonumentSchema = new Schema(objSchema, { timestamps: true });

// Crear índice 2dsphere para consultas geoespaciales
MonumentSchema.index({ location: '2dsphere' });

const Monument = mongoose.model('Monument', MonumentSchema);

module.exports = Monument;


