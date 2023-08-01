const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const multer = require('multer');
const app = express();
// var upload = multer({ dest: 'uploads/' });
// Connect database
connectDB();
app.use(cors());

//Upload file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './front-end/public/symptom/');
  },
  filename: function (req, file, cb) {
    console.log(file);
    // cb(null, Date.now() + '-' + file.originalname);
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).array('file');
app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    // console.log(res);
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
      // A Multer error occurred when uploading.
    } else if (err) {
      return res.status(500).json(err);
      // An unknown error occurred when uploading.
    }

    return res.status(200).send(req.file);
    // Everything went fine.
  });
});

// Init Middleware to allow getting data using req.body
app.use(express.json({ extended: false }));

// Local port
const PORT = 5000;

// Define routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/appointment', require('./routes/api/appointment'));
app.use('/api/document', require('./routes/api/document'));
app.use('/api/symptom', require('./routes/api/symptom'));
app.use('/api/measurement', require('./routes/api/measurement'));
app.use('/api/medication', require('./routes/api/medication'));
app.use('/api/instruction', require('./routes/api/instruction'));

app.get('/', (req, res) => res.send(`API Running`));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
