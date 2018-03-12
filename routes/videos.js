const router = require('express').Router();

const Video = require('../models/video');

router.post('/videos', async (req, res, next) => {
  const {title, description} = req.body;
  const video = new Video({title, description});

  await video.save();
  res.status(201).send('Created');
});

module.exports = router;
