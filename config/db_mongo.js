const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URI || "mongodb://localhost:27017/test";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url, {
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

const db = mongoose.connection;
db.on('error', (error) => console.error('Error en la conexión a MongoDB:', error));
db.once('open', () => console.log('Conexión a la base de datos establecida'));

module.exports = connectToDatabase;

