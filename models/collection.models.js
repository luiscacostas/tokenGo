const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  tokens: [{ type: Schema.Types.ObjectId, ref: 'Token' }]
}, { timestamps: true });

module.exports = mongoose.model('Collection', CollectionSchema);
