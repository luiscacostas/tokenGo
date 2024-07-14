const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async() => {
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Tiempo de espera para selección de servidor
  socketTimeoutMS: 45000 // Tiempo de espera para el socket
}
  
)}


module.exports = connectToDatabase;

