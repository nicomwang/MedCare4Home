const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Document = require("../../models/Document");
const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/document
// @desc     Create a new document
// @access   Private
router.post("/", auth, async (req, res) => {
  try {
    let newDocument = new Document({
      profile: req.body.profile,
      documentType: req.body.documentType,
      documentName: req.body.documentName,
    });

    const document = await newDocument.save();
    res.json(document);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error for uploading a document");
  }
});

// @route    PUT api/document
// @desc     Update document
// @access   Private
router.put("/:id", auth, async (req, res) => {
  try {
    let updatedDocument = {
      documentType: req.body.documentType,
      documentName: req.body.documentName,
    };

    const document = await Document.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedDocument },
      {
        setDefaultsOnInsert: true,
        useFindAndModify: false,
      }
    );

    if (!document) {
      return res.status(404).json({ msg: "Document not found" });
    }

    return res.json(document);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error for updating document");
  }
});

// @route    DELETE api/document
// @desc     Delete document
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const document = await Document.findById({ _id: req.params.id });
    await document.remove();
    res.json({ msg: "Document deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error for Deleting Document");
  }
});

// @route    GET api/document/:id
// @desc     Get one document by document id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ msg: "Document not found" });
    }

    res.json(document);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error for Getting One Document");
  }
});

// @route    GET api/document/
// @desc     Get all documents
// @access   Private
router.get(
  "/profile/:profile_id",
  checkObjectId("profile_id"),
  async ({ params: { profile_id } }, res) => {
    try {
      const document = await Document.find({ profile: profile_id });

      if (!document) {
        return res.status(404).json({ msg: "Documents not found" });
      }

      res.json(document);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error for Getting Documents");
    }
  }
);

module.exports = router;
