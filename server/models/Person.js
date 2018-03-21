const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const PersonSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  first: { type: String, required: true },
  last: { type: String, required: true },
  rank: { type: String, required: true },
  unit: { type: String, required: true }
});

module.exports = mongoose.model('Person', PersonSchema);
