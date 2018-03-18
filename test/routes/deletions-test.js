const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const {parseTextFromHTML, parseAttributeFromHTML} = require('../test-utils');

const {connectDatabase, disconnectDatabase} = require('../database-utilities'); 

const Video = require('../../models/video');

const app = require('../../app');

describe('Server path: /videos/:id/deletions', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);
    
  describe('POST', () => {
    it('removes a record', async () => {
      const title = 'A new train video';
      const description= 'Oooo Cool train!  Lets look at the train now...!';
      const url = 'https://www.youtube.com/watch?v=3EGOwfWok5s';
      const video = new Video({title, description, url});
      await video.save();

      const response = await request(app).
            post(`/videos/${video._id}/deletions`).
            type('form').
            send({});
      const allVideos = await Video.find({});

      assert.equal(allVideos.length, 0);
    });
  });
});