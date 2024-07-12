const mongoose = require('mongoose');
require('../config/db_mongo'); 

const objSchema = {
  name: { 
    type: String, 
    required: true 
},
  description: { 
    type: String 
},
  city: { 
    type: String, 
    required: true 
},
  country: { 
    type: String, 
    required: true 
},
  coordinates: {
    lat: { 
        type: Number, 
        required: true
    },
    lng: { 
        type: Number, 
        required: true
    },
  }
};

const tokenSchema = mongoose.Schema(objSchema, { timestamps: true });

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;


const newToken = {
  name: 'Parque el Retiro',
  description: 'Parque',
  city: 'Madrid',
  country: 'España',
  coordinates: {
    lat: 40.419444444444444,
    lng: -3.693055555555556
  }
};

const saveToken = async () => {
  try {
    const token = new Token(newToken);
    const savedToken = await token.save();
    console.log('Token guardado:', savedToken);
  } catch (error) {
    console.error('Error al guardar el Token:', error);
  } finally {
    mongoose.connection.close();
  }
};

saveToken();
