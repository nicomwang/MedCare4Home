const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeasurementSchema = new Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  measurementType: {
    type: String
  },
  measurementDate: {
    type: Date
  },
  measurementTime: {
    type: Date
  },
  measurementValue: {
    type: Number
  },
  measurementUnit: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('measurement', MeasurementSchema);