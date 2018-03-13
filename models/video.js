const {mongoose} = require('../database');

const Video = mongoose.model(
  'Video',
  mongoose.Schema({
    title: {
      type: String,
      required: 'title is required'
    },

    description: {
      type: String
    },

    url: {
      type: String
    }
  })
);

module.exports = Video;
