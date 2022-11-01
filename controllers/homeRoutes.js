const router = require('express').Router();
const { Image} = require('../models');
const fs = require("fs");
const path = require("path");
require('dotenv').config();
const UPLOAD_DIR = path.join(process.env.public_dir,process.env.upload_dir);
router.get('/', async (req, res) => {
  console.log("========get/uploadFile DB========================");
    res.status(500).render("homePage");
});
router.get('/uploadFileDB', async (req, res) => {
  console.log("========get/uploadFile DB========================");
  try {
    // Get all projects and JOIN with user data
    const fileData = await Image.findAll();
    console.log(fileData.length+"<<<<<<<<<<<<<<<<<<");
    // Serialize data so the template can read it
    const files = fileData.map((file) => file.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepageDB', { 
      files
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/uploadFileDir', async (req, res) => {
  console.log("========get/uploadFile Dir========================");
  try {
    // Get all projects and JOIN with user data
    const fileData = await Image.findAll();
    // Serialize data so the template can read it
    const files = fileData.map((file) => file.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepageDir', { 
      files
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/uploadFileDB', async function (req, res) {
  console.log("========post/uploadFile========================");
  try{
    let buff = new Buffer.from(req.file.buffer);
    let base64data = buff.toString('base64');
    const im = await Image.create({
      name: req.file.originalname,
      image: base64data,
      mimetype: req.file.mimetype,
      comment: req.body.comment,
    });

    res.status(200).redirect("uploadFileDB");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/uploadFileDir', async function (req, res) {
  console.log("========post/uploadFile Dir========================");
  try{
    let buff = new Buffer.from(req.file.buffer,"binary");
  
    //get file extension...
    let fileName = 'f' + Date.now ()+ '.'+ req.file.originalname.substring(req.file.originalname.lastIndexOf('.') + 1);
    let fullPathFileName = path.join(UPLOAD_DIR, fileName);
    
    const stream = fs.createWriteStream(fullPathFileName);
    stream.write(buff,'utf8');
    stream.close();
    const im = await Image.create({
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      name: path.join(process.env.upload_dir,fileName),
      comment: req.body.comment,
    });
    res.status(200).redirect("uploadFileDir");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
