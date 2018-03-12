const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');

describe('Server path: /videos', () => {
  describe('POST', () => {
    it('returns 201 when posting video', async () => {
      const video = {};

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      assert.equal(response.status, 201);
    });
  });
});
