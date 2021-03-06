const router = require('express').Router();

const Video = require('../models/video');

router.get('/', async (req, res, next) => {
  res.redirect('/videos');
});

router.get('/videos', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos});
});

router.get('/videos/create', async (req, res, next) => {
  res.status(200).render('videos/create');
});

router.get('/videos/:id', async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if ( video == null ) {
    res.status(404).render('videos/not-found');
  } else {
    res.status(201).render('videos/show', {video});
  }
});

router.get('/videos/:id/edit', async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  res.render('videos/edit', {video});
});

router.post('/videos', async (req, res, next) => {
  const {title, description, url} = req.body;
  const video = new Video({title, description, url});
  video.validateSync();
  
  if( video.errors ) {
    res.status(400).render('videos/create', {video});
  } else {
    await video.save();
    res.redirect(`/videos/${video._id}`);
  }

});

router.post('/videos/:id/updates', async (req, res, next) => {
  const {title, description, url} = req.body;
  const origVideo = await Video.findById(req.params.id);
  let video = await Video.findById(req.params.id);
  video.title = title;
  video.description = description;
  video.url = url;
  video.validateSync();

  if( video.errors ) {
    video.title = origVideo.title;
    video.description = origVideo.description;
    video.url = origVideo.url;
    res.status(400).render('videos/edit', {video});
  } else {
    await video.save();
    res.redirect(`/videos/${video._id}`);
  }
});

router.post('/videos/:id/deletions', async (req, res, next) => {
  const video = await Video.findById(req.params.id);

  if (video == null) {
    res.status(404).render('videos/not-found');
  } else {
    await video.remove();
    res.redirect('/');
  }
});

router.post('/videos/:id/comments', async (req, res, next) => {
  const {comment} = req.body;
  let video = await Video.findById(req.params.id);

  if( comment !== '') {
    video.comments.push(comment);
    await video.save();
  }
  
  res.redirect(`/videos/${req.params.id}`);
});

module.exports = router;
