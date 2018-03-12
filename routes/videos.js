const router = require('express').Router();

const Video = require('../models/video');

router.get('/', async (req, res, next) => {
  res.render('index');
});

router.post('/videos', async (req, res, next) => {
  const {title, description} = req.body;
  const video = new Video({title, description});

  await video.save();
  res.status(201).render('video', {video});
});

module.exports = router;
