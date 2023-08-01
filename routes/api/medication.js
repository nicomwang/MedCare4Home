const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Medication = require('../../models/Medication');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/medication
// @desc     Create a new medication
// @access   Private
router.post('/', auth, async (req, res) => {
  const profile = await Profile.findById(req.user.id).select('-password');
  try {
    let newMedication = new Medication({
      profile: req.body.profile,
      appointment: req.body.appointment,
      medicationName: req.body.medicationName,
      medicationArea: req.body.medicationArea,
      medicationType: req.body.medicationType,
      refillDate: req.body.refillDate
    });

    const medication = await newMedication.save();
    res.json(medication);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error for creating a medication');
  }
});

// @route    PUT api/medication
// @desc     Update medication
// @access   Private
router.put('/:id', auth, async (req, res) => {
  try {
    let updatedMedication = {
      appointment: req.body.appointment,
      medicationName: req.body.medicationName,
      medicationArea: req.body.medicationArea,
      medicationType: req.body.medicationType,
      refillDate: req.body.refillDate
    };

    const medication = await Medication.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedMedication },
      {
        setDefaultsOnInsert: true,
        useFindAndModify: false
      }
    );

    if (!medication) {
      return res.status(404).json({ msg: 'Medication not found' });
    }

    return res.json(medication);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error for updating medication');
  }
});

// @route    DELETE api/medication
// @desc     Delete medication
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const medication = await Medication.findById({ _id: req.params.id });
    await medication.remove();
    res.json({ msg: 'Medication deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error for Deleting Medication');
  }
});

// @route    GET api/medication/:id
// @desc     Get one medication by medication id
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (!medication) {
      return res.status(404).json({ msg: 'Medication not found' });
    }

    res.json(medication);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error for Getting One Medication');
  }
});

// @route    GET api/medication/
// @desc     Get all medications
// @access   Private
router.get(
  '/profile/:profile_id',
  checkObjectId('profile_id'),
  async ({ params: { profile_id } }, res) => {
    try {
      const medication = await Medication.find({ profile: profile_id });

      if (!medication) {
        return res.status(404).json({ msg: 'Medications not found' });
      }

      res.json(medication);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error for Getting Medications');
    }
  }
);

module.exports = router;
