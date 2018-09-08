/* In CoffeeShop.js */
// Require mongoose in this file.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema.
const trailSchema = new Schema({
  name: String,
  location: {
    type: Array,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created_at: {
      type: Date,
      default: Date.now()
  }
});

// Create a model using schema.
const Trails = mongoose.model('Trails', trailSchema);

// Make this available to our Node applications.
module.exports = Trails;