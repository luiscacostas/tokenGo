const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log('Error de conexión:', err));

// Rutas (las rutas se agregarán más tarde)
// app.use('/api/users', userRoutes);
// app.use('/api/tokens', tokenRoutes);
// app.use('/api/collections', collectionRoutes);
// app.use('/api/routes', routeRoutes);

// Socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('updateLocation', (data) => {
    console.log('Ubicación recibida:', data);
    io.emit('locationUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});