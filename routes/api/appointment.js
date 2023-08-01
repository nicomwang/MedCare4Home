const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Appointment = require("../../models/Appointment");
const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/appointment
// @desc     Create a new appointment
// @access   Private
router.post(
  "/",
  auth,
  check("appointmentType", "Appointment type is required").notEmpty(),
  check("appointmentDate", "Appointment date is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let newAppointment = new Appointment({
        user: req.user.id,
        profile: req.body.profile,
        appointmentType: req.body.appointmentType,
        appointmentDate: req.body.appointmentDate,
        appointmentTime: req.body.appointmentTime,
        location: req.body.location,
        doctor: req.body.doctor,
      });

      const appointment = await newAppointment.save();
      res.json(appointment);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error for Creating Appointment");
    }
  }
);

// @route    PUT api/appointment
// @desc     Update appointment
// @access   Private
router.put(
  "/:id",
  auth,
  check("appointmentType", "Appointment type is required").notEmpty(),
  check("appointmentDate", "Appointment date is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let updatedAppointment = {
        appointmentType: req.body.appointmentType,
        appointmentDate: req.body.appointmentDate,
        appointmentTime: req.body.appointmentTime,
        location: req.body.location,
        doctor: req.body.doctor,
      };

      const appointment = await Appointment.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updatedAppointment },
        {
          setDefaultsOnInsert: true,
          useFindAndModify: false,
        }
      );
      
      if (!appointment) {
        return res.status(404).json({ msg: "Appointment not found" });
      }

      return res.json(appointment);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error for updating appointment");
    }
  }
);

// @route    DELETE api/appointment
// @desc     Delete appointment
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById({ _id: req.params.id });
    await appointment.remove();
    res.json({ msg: "Appointment deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error for Deleting Appointment");
  }
});

// @route    GET api/appointment/:id
// @desc     Get one appointment by appointment id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error for Getting One Appointment");
  }
});

// @route    GET api/appointment/
// @desc     Get all appointments in the family
// @access   Private
router.get(
  "/user/:user_id",
  checkObjectId("user_id"),
  async ({ params: { user_id } }, res) => {
    try {
    
      const appointment = await Appointment.find({ user: user_id });

      if (!appointment) {
        return res.status(404).json({ msg: "Appointments not found" });
      }

      res.json(appointment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error for Getting Appointments");
    }
  }
);

module.exports = router;
