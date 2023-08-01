const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructionSchema = new Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  medication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "medication",
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  medicationTime: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('instruction', InstructionSchema);