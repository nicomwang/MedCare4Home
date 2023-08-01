const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Measurement = require("../../models/Measurement");
const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/measurement
// @desc     Create a new measurement
// @access   Private
router.post("/", auth, async (req, res) => {
  try {
    let newMeasurement = new Measurement({
      profile: req.body.profile,
      measurementType: req.body.measurementType,
      measurementDate: req.body.measurementDate,
      measurementTime: req.body.measurementTime,
      measurementValue: req.body.measurementValue,
      measurementUnit: req.body.measurementUnit,
    });

    const measurement = await newMeasurement.save();
    res.json(measurement);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error for creating a measurement");
  }
});

// @route    PUT api/measurement
// @desc     Update measurement
// @access   Private
router.put("/:id", auth, async (req, res) => {
  try {
    let updatedMeasurement = {
      measurementType: req.body.measurementType,
      measurementDate: req.body.measurementDate,
      measurementTime: req.body.measurementTime,
      measurementValue: req.body.measurementValue,
      measurementUnit: req.body.measurementUnit,
    };

    const measurement = await Measurement.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedMeasurement },
      {
        setDefaultsOnInsert: true,
        useFindAndModify: false,
      }
    );

    if (!measurement) {
      return res.status(404).json({ msg: "Measurement not found" });
    }

    return res.json(measurement);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error for updating measurement");
  }
});

// @route    DELETE api/measurement
// @desc     Delete measurement
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const measurement = await Measurement.findById({ _id: req.params.id });
    await measurement.remove();
    res.json({ msg: "Measurement deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error for Deleting Measurement");
  }
});

// @route    GET api/measurement/:id
// @desc     Get one measurement by measurement id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const measurement = await Measurement.findById(req.params.id);

    if (!measurement) {
      return res.status(404).json({ msg: "Measurement not found" });
    }

    res.json(measurement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error for Getting One Measurement");
  }
});

// @route    GET api/measurement/
// @desc     Get all measurements
// @access   Private
router.get(
  "/profile/:profile_id",
  checkObjectId("profile_id"),
  async ({ params: { profile_id } }, res) => {
    try {
      const measurement = await Measurement.find({ profile: profile_id });

      if (!measurement) {
        return res.status(404).json({ msg: "Measurements not found" });
      }

      res.json(measurement);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error for Getting Measurements");
    }
  }
);

module.exports = router;
