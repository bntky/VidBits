const router = require('express').Router();

router.post('/videos', async (req, res, next) => {
  res.status(201).send('Created');
});

module.exports = router;
