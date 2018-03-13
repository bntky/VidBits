const router = require('express').Router();

const Video = require('../models/video');

router.get('/', async (req, res, next) => {
  res.redirect('/videos');
});

router.get('/videos', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos});
});

router.get('/videos/create.html', async (req, res, next) => {
  res.status(200).render('create');
});

router.get('/videos/:id', async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  res.status(201).render('videos/show', {video});
});

router.post('/videos', async (req, res, next) => {
  const {title, description, url} = req.body;
  const video = new Video({title, description, url});

  if( title ) {
    await video.save();
    res.redirect(`/videos/${video._id}`);
  } else {
    res.status(400).render('create', {
      title: '',
      description: video.description,
      error: 'title is required'
    });
  }

});

module.exports = router;
