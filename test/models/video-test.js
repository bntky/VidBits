const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

require('../test-utils');
const {connectDatabase, disconnectDatabase} = require('../database-utilities'); 

const Video = require('../../models/video.js');

describe('Model: Video', () => {
  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  describe('title field', () => {
    it('is a string', async () => {
      const title = 314159;

      const video = new Video({ title });

      assert.strictEqual(video.title, title.toString());
    });
  });

  describe('description field', () => {
    it('is a string', async () => {
      const description = 314159;

      const video = new Video({ description });

      assert.strictEqual(video.description, description.toString());
    });
  });
});
