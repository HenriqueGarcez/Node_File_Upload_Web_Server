const express = require('express');
const multer = require('multer');
const app = module.exports = express();

// fc returns integer random number
const mathRandom = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

// Storage uploaded files
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
  })

// multer constructor with single file storage
const upload = multer({ storage: storage }).single('img');


app.post('/file', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.status(400).json({message: err});
        }else
            console.log(req.file.filename);
            res.json({
                properties: {
                    fileName: req.file.filename,
                    action: mathRandom(3)
                }
            });
    })
})


app.get('/occ',(req, res) => {
    res.send('<h1> Get </h1>');
})