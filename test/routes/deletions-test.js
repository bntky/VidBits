const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const {parseTextFromHTML, parseAttributeFromHTML} = require('../test-utils');

const {connectDatabase, disconnectDatabase, fakeId} = require('../database-utilities'); 

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

    it('fails to delete a nonexistent video', async () => {
      const videoId = fakeId(24601);

      const response = await request(app).
            post(`/videos/${videoId}/deletions`).
            type('form').
            send({});

      assert.equal(response.status, 404);
      assert.include(response.text, 'Video not found');
    });

    it('renders reasonable error page for nonexistent video', async () => {
      const videoId = fakeId(24601);

      const response = await request(app).
            post(`/videos/${videoId}/deletions`).
            type('form').
            send({});

      assert.include(parseTextFromHTML(response.text, 'h1'), 'Video not found');
    });
  });
});
