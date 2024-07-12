const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Tiempo de espera para selección de servidor
  socketTimeoutMS: 45000 // Tiempo de espera para el socket
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log('Error de conexión:', err));

module.exports = mongoose;

//Anterior proyecto 

// const connectToDatabase = async() => {
//     try {
//       await mongoose.connect(process.env.MONGODB_URI);
//       console.log("Connected to MongoDB Atlas with Mongoose!");
//     } catch (err) {
//       console.error("Error connecting to MongoDB Atlas:", err);
//       process.exit(1);
//     }
//   }
//   module.exports = connectToDatabase;
