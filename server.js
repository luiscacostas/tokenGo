require('dotenv').config();
const express = require('express');
const connectToDatabase = require('./config/db_mongo.js')
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

connectToDatabase();

const app = express();
const server = http.createServer(app);
const io = socketIo(server)

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

app.use(morgan(':method :host :status - :response-time ms :body'));

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('updateLocation', (data) => {
    console.log('Location data received:', data);
    socket.broadcast.emit('locationUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/monuments', require('./routes/monument.routes'));
app.use('/api/routes', require('./routes/routes.routes'));
app.use('/api/auth', require('./routes/auth.routes.js'));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use('*',error404);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
