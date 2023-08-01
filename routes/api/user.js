const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('config');
const stringCapitalizeName = require('string-capitalize-name');
// @route    POST api/user
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    // Set validaton rules
    check('email', 'Pleae use a valid email').isEmail(),
    check('password', 'Password must be at least 6 chars long').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    // Find the validation errors in this request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // create instance of user
      user = new User({
        name: sanitizeName(name),
        email,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return JasonWebToken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      //res.send('User registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error for Registration');
    }
  }
);

module.exports = router;
// Minor sanitizing to be invoked before reaching the database
sanitizeName = (name) => {
  return stringCapitalizeName(name);
};
