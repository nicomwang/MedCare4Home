const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String
  },
  relationship: {
    type: String
  },
  gender: {
    type: String
  },
  heightFeet: {
    type: Number
  },
  heightInch: {
    type: Number
  },
  weight: {
    type: Number
  },
  bmi: {
    type: Number
  },
  birthday: {
    type: Date
  },
  isSelf: {
    type: Boolean
  },
  primaryProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'primary'
  },
  isPrimary: {
    type: Boolean,
    default: false
  },
  medicalDocument: [
    {
      type: {
        type: String
      },
      updateAt: {
        type: Date
      },
      fileName: {
        type: String
      }
    }
  ],
  appointment: [
    {
      type: {
        type: String
      },
      date: {
        type: String
      },
      note: {
        type: String
      },
      location: {
        type: String
      },
      doctor: {
        type: String
      },
      calColor: {
        type: String
      }
    }
  ],
  medication: [
    {
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
    }
  ],
  medicalTest: [
    {
      type: {
        type: String
      },
      instruction: {
        type: String
      },
      frequency: {
        type: String
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      }
    }
  ],
  symptomReport: [
    {
      name: {
        type: String
      },
      partOfBody: {
        type: [String]
      },
      description: {
        type: String
      },
      date: {
        type: Date
      },
      filename: {
        type: [String]
      }
    }
  ],
  measurement: {
    neck: {
      type: String
    },
    bust: {
      type: String
    },
    shoulder: {
      type: String
    },
    waist: {
      type: String
    },
    abdomen: {
      type: String
    },
    hip: {
      type: String
    },
    biceps: {
      left: {
        type: String
      },
      right: {
        type: String
      }
    },
    thigh: {
      left: {
        type: String
      },
      right: {
        type: String
      }
    },
    calf: {
      left: {
        type: String
      },
      right: {
        type: String
      }
    }
  }
});

module.exports = mongoose.model('profile', ProfileSchema);
