const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Symptom = require("../../models/Symptom");
const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/symptom
// @desc     Create a new symptom
// @access   Private
router.post("/", auth, async (req, res) => {
  try {
    let newSymptom = new Symptom({
      profile: req.body.profile,
      symptomType: req.body.symptomType,
      symptomArea: req.body.symptomArea,
      symptomFileName: req.body.symptomFileName,
      symptomDate: req.body.symptomDate,
      symptomTime: req.body.symptomTime,
    });

    const symptom = await newSymptom.save();
    res.json(symptom);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error for uploading a symptom");
  }
});

// @route    PUT api/symptom
// @desc     Update symptom
// @access   Private
router.put("/:id", auth, async (req, res) => {
  try {
    let updatedSymptom = {
      symptomType: req.body.symptomType,
      symptomArea: req.body.symptomArea,
      symptomFileName: req.body.symptomFileName,
      symptomDate: req.body.symptomDate,
      symptomTime: req.body.symptomTime,
    };

    const symptom = await Symptom.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedSymptom },
      {
        setDefaultsOnInsert: true,
        useFindAndModify: false,
      }
    );

    if (!symptom) {
      return res.status(404).json({ msg: "Symptom not found" });
    }

    return res.json(symptom);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error for updating symptom");
  }
});

// @route    DELETE api/symptom
// @desc     Delete symptom
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const symptom = await Symptom.findById({ _id: req.params.id });
    await symptom.remove();
    res.json({ msg: "Symptom deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error for Deleting Symptom");
  }
});

// @route    GET api/symptom/:id
// @desc     Get one symptom by symptom id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const symptom = await Symptom.findById(req.params.id);

    if (!symptom) {
      return res.status(404).json({ msg: "Symptom not found" });
    }

    res.json(symptom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error for Getting One Symptom");
  }
});

// @route    GET api/symptom/
// @desc     Get all symptoms
// @access   Private
router.get(
  "/profile/:profile_id",
  checkObjectId("profile_id"),
  async ({ params: { profile_id } }, res) => {
    try {
      const symptom = await Symptom.find({ profile: profile_id });

      if (!symptom) {
        return res.status(404).json({ msg: "Symptoms not found" });
      }

      res.json(symptom);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error for Getting Symptoms");
    }
  }
);

module.exports = router;
