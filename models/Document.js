const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  documentType: {
    type: String
  },
  documentName: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('document', DocumentSchema);