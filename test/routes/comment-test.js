const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const {parseTextFromHTML, parseAttributeFromHTML} = require('../test-utils');

const {connectDatabase, disconnectDatabase, generateNewVideo} = require('../database-utilities'); 

const Video = require('../../models/video');

const app = require('../../app');

describe('Server path: /videos/:id/comments', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);
    
  describe('POST', () => {
    it('redirects to video show page after posting a comment to a video', async () => {
      const video = new Video(generateNewVideo());
      await video.save();
      const comment = 'First post!';

      const response = await request(app).
            post(`/videos/${video._id}/comments`).
            type('form').
            send(comment);

      assert.equal(response.status, 302);
      assert.equal(response.headers.location, `/videos/${video._id}`);
    });
  });
});
