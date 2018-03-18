const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const {parseTextFromHTML, parseAttributeFromHTML} = require('../test-utils');

const {connectDatabase, disconnectDatabase, fakeId, generateNewVideo} = require('../database-utilities'); 

const Video = require('../../models/video');

const app = require('../../app');

describe('Server path: /videos/:id/deletions', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);
    
  describe('POST', () => {
    it('removes a record', async () => {
      const video = new Video(generateNewVideo());
      await video.save();

      const response = await request(app).
            post(`/videos/${video._id}/deletions`).
            type('form').
            send({});
      const allVideos = await Video.find({});

      assert.equal(allVideos.length, 0);
    });

    it('fails to delete a nonexistent video', async () => {
      const videoId = fakeId();

      const response = await request(app).
            post(`/videos/${videoId}/deletions`).
            type('form').
            send({});

      assert.equal(response.status, 404);
      assert.include(response.text, 'Video not found');
    });

    it('renders reasonable error page for nonexistent video', async () => {
      const videoId = fakeId();

      const response = await request(app).
            post(`/videos/${videoId}/deletions`).
            type('form').
            send({});

      assert.include(parseTextFromHTML(response.text, 'h1'), 'Video not found');
    });
  });
});
