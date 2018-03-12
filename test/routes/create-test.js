const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

require('../test-utils');

const {connectDatabase, disconnectDatabase} = require('../database-utilities'); 

const Video = require('../../models/video');

const app = require('../../app');

describe('Server path: /videos', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);
    
  describe('POST', () => {
    it('returns 201 when posting video', async () => {
      const video = {};

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      assert.equal(response.status, 201);
    });

    it('creates a new video and adds it to the database', async () => {
      const video = {
        title: 'A new train video',
        description: 'Oooo Cool train!  Lets look at the train now...!'
      };

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);
      const createdVideo = await Video.findOne({});

      assert.ok(createdVideo, 'Video was not added to the database');
    });
  });
});
