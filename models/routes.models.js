const mongoose = require('mongoose');
require('../config/db_mongo');

const RoutePointSchema = new mongoose.Schema({
  timestamp: { type: Date, 
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
      required: true 
    }
  }
});

const objSchema = {
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  city: { 
    type: String, 
    required: true 
  },
  route: { 
    type: [RoutePointSchema], 
    required: true 
  }
};

const RouteSchema = mongoose.Schema(objSchema, { timestamps: true });

const Route = mongoose.model('Route', RouteSchema);

module.exports = Route;


// const newRoute = {
//     user_id: '6692abf8ea8dbfbeb5b649c5',
//     city: 'Paris',
//     route: [
//       {
//         timestamp: new Date('2024-07-13T12:34:56.789Z'),
//         location: {
//           type: 'Point',
//           coordinates: [2.2945, 48.8584]
//         }
//       },
//       {
//         timestamp: new Date('2024-07-13T12:45:56.789Z'),
//         location: {
//           type: 'Point',
//           coordinates: [2.2950, 48.8590]
//         }
//       }
//     ]
//   };
  
//   const saveRoute = async () => {
//     try {
//       const route = new Route(newRoute);
//       const savedRoute = await route.save();
//       console.log('Route saved:', savedRoute);
//     } catch (error) {
//       console.error('Error saving route:', error.message);
//     } finally {
//       mongoose.connection.close();
//     }
//   };
  
//   saveRoute();