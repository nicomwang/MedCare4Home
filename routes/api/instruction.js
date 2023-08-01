const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Instruction = require("../../models/Instruction");
const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/instruction
// @desc     Create a new instruction
// @access   Private
router.post("/", auth, async (req, res) => {
  try {
    let newInstruction = new Instruction({
      profile: req.body.profile,
      medication: req.body.medication,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      medicationTime: req.body.medicationTime,
    });

    const instruction = await newInstruction.save();
    res.json(instruction);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error for creating a instruction");
  }
});

// @route    PUT api/instruction
// @desc     Update instruction
// @access   Private
router.put("/:id", auth, async (req, res) => {
  try {
    let updatedInstruction = {
        medication: req.body.medication,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        medicationTime: req.body.medicationTime,
    };

    const instruction = await Instruction.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedInstruction },
      {
        setDefaultsOnInsert: true,
        useFindAndModify: false,
      }
    );

    if (!instruction) {
      return res.status(404).json({ msg: "Instruction not found" });
    }

    return res.json(instruction);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error for updating instruction");
  }
});

// @route    DELETE api/instruction
// @desc     Delete instruction
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const instruction = await Instruction.findById({ _id: req.params.id });
    await instruction.remove();
    res.json({ msg: "Instruction deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error for Deleting Instruction");
  }
});

// @route    GET api/instruction/:id
// @desc     Get one instruction by instruction id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const instruction = await Instruction.findById(req.params.id);

    if (!instruction) {
      return res.status(404).json({ msg: "Instruction not found" });
    }

    res.json(instruction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error for Getting One Instruction");
  }
});

// @route    GET api/instruction/
// @desc     Get all instructions
// @access   Private
router.get(
  "/profile/:profile_id",
  checkObjectId("profile_id"),
  async ({ params: { profile_id } }, res) => {
    try {
      const instruction = await Instruction.find({ profile: profile_id });

      if (!instruction) {
        return res.status(404).json({ msg: "Instructions not found" });
      }

      res.json(instruction);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error for Getting Instructions");
    }
  }
);

module.exports = router;
