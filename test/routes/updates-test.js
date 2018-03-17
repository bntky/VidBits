const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const {parseTextFromHTML, parseAttributeFromHTML} = require('../test-utils');

const {connectDatabase, disconnectDatabase} = require('../database-utilities'); 

const Video = require('../../models/video');

const app = require('../../app');

describe('Server path: /videos/:id/updates', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);
    
  describe('POST', () => {
    it('updates an existing video', async () => {
      const title = 'A new train video';
      const description= 'Oooo Cool train!  Lets look at the train now...!';
      const url = 'https://www.youtube.com/watch?v=3EGOwfWok5s';
      const video = new Video({title, description, url});
      await video.save();
      const newTitle = 'A newer than new train video';
      const updatedVideo = {
        title: newTitle,
        description: description,
        url: url
      };

      const response = await request(app).
            post(`/videos/${video._id}/updates`).
            type('form').
            send(updatedVideo);
      const allVideos = await Video.find({});

      assert.equal(allVideos.length, 1);
      assert.equal(allVideos[0].title, newTitle);
    });
  });
});
