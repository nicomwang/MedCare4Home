const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SymptomSchema = new Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  symptomType: {
    type: String
  },
  symptomArea: {
    type: String
  },
  symptomFileName: {
    type: String
  },
  symptomDate: {
    type: Date
  },
  symptomTime: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('symptom', SymptomSchema);