require('dotenv').config();
const express = require('express');
const connectToDatabase = require('./config/db_mongo.js')
const connectDB = require('./config/db_mongo');
const dotenv = require('dotenv');
const cors = require('cors');


// Connect to the database
connectToDatabase();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

app.use(morgan(':method :host :status - :response-time ms :body'));

// Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/monuments', require('./routes/monument.routes'));
app.use('/api/routes', require('./routes/routes.routes'));
app.use('/api/auth', require('./routes/auth.routes.js'));

app.use('*',error404);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
