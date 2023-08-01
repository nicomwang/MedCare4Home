const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicationSchema = new Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile'
  },
  name: {
    type: String
  },
  instruction: {
    type: String
  },
  approvedBy: {
    type: String
  },
  prescribed: {
    type: Date
  },
  quanity: {
    type: String
  },
  phamacy: {
    type: String
  },
  timesADay: {
    type: String
  },
  dosage: {
    type: String
  }
});

module.exports = mongoose.model('medication', MedicationSchema);
