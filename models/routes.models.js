const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  distance: { type: Number },
  path: [{
    lat: { type: Number },
    lng: { type: Number }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Route', RouteSchema);