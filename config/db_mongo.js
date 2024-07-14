const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Conectado a la base de datos MongoDB');
  } catch (error) {
    console.error('Error al conectar a la base de datos MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectToDatabase

