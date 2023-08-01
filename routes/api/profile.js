const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');
const upload = require('../../middleware/uploadFile');

const stringCapitalizeName = require('string-capitalize-name');
// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['email', 'name']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
// @route    POST api/profile
// @desc     Create or update a new profile
// @access   Private
router.post(
  '/',
  auth,
  // check('firstName', 'First name is required').notEmpty(),
  // check('lastName', 'Last name is required').notEmpty(),
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Requirement Error :', errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      // the rest of the fields we don't need to check
      ...rest
    } = req.body;
    //nuild a profile
    const profileFields = {
      user: req.user.id,
      ...rest
    };
    try {
      // let newProfile = new Profile({
      //   height: req.body.height,
      //   weight: req.body.weight,
      //   gender: req.body.gender,
      //   relationship: req.body.relationship,
      //   birthday: req.body.birthday,
      //   user: req.user.id,
      //   isSelf: req.body.isSelf
      // });

      // const profile = await newProfile.save();
      // console.log('Create Profile done');
      // res.json(profile);

      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error for Creating Profile');
    }
  }
);
// @route    POST api/profile/member
// @desc     Create or update a new profile
// @access   Private
router.post(
  '/member',
  auth,
  // check('firstName', 'First name is required').notEmpty(),
  // check('lastName', 'Last name is required').notEmpty(),
  // check(
  //   'isSelf',
  //   'Please choose whether you are the primary user or not'
  // ).notEmpty(),
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Requirement Error :', errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      // the rest of the fields we don't need to check
      ...rest
    } = req.body;
    //nuild a profile
    const profileFields = {
      user: req.user.id,
      ...rest
    };
    console.log('Create Member Profile:', profileFields);
    try {
      let newProfile = new Profile(profileFields);

      const profile = await newProfile.save();
      console.log('Create Member Profile done');
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error for Creating Profile');
    }
  }
);

// @route    PUT api/profile
// @desc     Update profile
// @access   Private
// router.put(
//   '/:id',
//   auth,
//   check('firstName', 'First name is required').notEmpty(),
//   check(
//     'isSelf',
//     'Please choose whether you are the primary user or not'
//   ).notEmpty(),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       let updatedProfile = {
//         firstName: sanitizeName(req.body.firstName),
//         lastName: sanitizeName(req.body.lastName),
//         birthday: req.body.birthday,
//         user: req.user.id,
//         isSelf: req.body.isSelf,
//         isActive: req.body.isActive
//       };

//       const profile = await Profile.findOneAndUpdate(
//         { _id: req.params.id },
//         { $set: updatedProfile },
//         {
//           setDefaultsOnInsert: true,
//           useFindAndModify: false
//         }
//       );
//       return res.json(profile);
//     } catch (err) {
//       console.error(err.message);
//       return res.status(500).send('Server Error for updating profile');
//     }
//   }
// );

// @route    GET api/profile/members/:primary_id
// @desc     Get all member profiles by profile primary
// @access   Public
router.get(
  '/members/:primary_id',
  checkObjectId('primary_id'),
  async ({ params: { primary_id } }, res) => {
    try {
      const profile = await Profile.find({
        primaryProfile: primary_id
      }).populate('user', ['email', 'name']);
      if (!profile)
        return res.status(400).json({ msg: ' Member Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ msg: 'Server Error for Getting User Profiles' });
    }
  }
);
// @route    GET api/profile/user/:user_id
// @desc     Get all profiles by user id
// @access   Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.find({
        user: user_id
      }).populate('user', ['email', 'name']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ msg: 'Server Error for Getting User Profiles' });
    }
  }
);

// @route    GET api/profile/:id
// @desc     Get one profile by profile id
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error for Getting One Profile');
  }
});
// @route    PUT api/profile/appointment
// @desc     Add profile appointment
// @access   Private
router.put(
  '/appointment',
  auth,
  check('type', 'Appointment type is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.appointment.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error for Add Appointment');
    }
  }
);
// @route    DELETE api/profile/appointment/:exp_id
// @desc     Delete appointment from profile
// @access   Private

router.delete('/appointment/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.appointment = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});
// @route    PUT api/profile/medication/:profileID
// @desc     Add profile medication
// @access   Private
router.put('/medication/:profileID', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await Profile.findById(req.params.profileID);

    profile.medication.unshift(req.body);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error for Add Medication');
  }
});
// @route    DELETE api/profile/medication/:exp_id
// @desc     Delete medication from profile
// @access   Private

router.delete('/medication/:profileID/:testID', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findById(req.params.profileID);

    foundProfile.medication = foundProfile.medication.filter(
      (exp) => exp._id.toString() !== req.params.testID
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error in Delete Medication' });
  }
});
// @route    UPDATE api/profile/medication/:profileID/:testID
// @desc     Update medication from profile
// @access   Private

router.put('/medication/:profileID/:testID', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findById(req.params.profileID);

    foundProfile.medication = foundProfile.medication.filter(
      (exp) => exp._id.toString() !== req.params.testID
    );
    foundProfile.medication.unshift(req.body);
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error in Update Medication' });
  }
});
// @route    PUT api/profile/medTest/:profileID
// @desc     Add profile medical test
// @access   Private
router.put(
  '/medTest/:profileID',
  auth,
  check('type', 'Medical Test type is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('err', errors);
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log('req data:', req.body);
      // const profile = await Profile.findOne({ user: req.user.id });
      const profile = await Profile.findById(req.params.profileID);
      profile.medicalTest.unshift(req.body);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error in Add Medical Test');
    }
  }
);
// @route    PUT api/profile/medTest/:profileID/:testID
// @desc     update medical test in Profile
// @access   Private
router.put('/medTest/:profileID/:testID', auth, async (req, res) => {
  try {
    console.log('req data:', req.body);
    // const profile = await Profile.findOne({ user: req.user.id });
    const foundProfile = await Profile.findById(req.params.profileID);
    // Delete the test
    foundProfile.medicalTest = foundProfile.medicalTest.filter(
      (test) => test._id.toString() !== req.params.testID
    );
    foundProfile.medicalTest.unshift(req.body);
    //////////////////
    // const testID = req.body.id;
    // // Pull out comment
    // const test = Profile.medicalTest.find((test) => test.id === testID);

    await foundProfile.save();

    res.json(foundProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error in Update Medical Test');
  }
});
// @route    DELETE api/profile/medTest/:profileID/:testID
// @desc     Delete medical test from profile
// @access   Private

router.delete('/medTest/:profileID/:testID', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findById(req.params.profileID);

    foundProfile.medicalTest = foundProfile.medicalTest.filter(
      (exp) => exp._id.toString() !== req.params.testID
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error in Delete Medical Test' });
  }
});
// @route    PUT api/profile/symptom
// @desc     Add symptom report
// @access   Private
router.put(
  '/symptom',
  auth,
  check('name', 'Symptom name is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.symptomReport.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error for Add Appointment');
    }
  }
);
// @route    DELETE api/profile/medTest/:exp_id
// @desc     Delete medical test from profile
// @access   Private

router.delete('/symptom/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.symptomReport = foundProfile.symptomReport.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;

// Minor sanitizing to be invoked before reaching the database
sanitizeName = (name) => {
  return stringCapitalizeName(name);
};
