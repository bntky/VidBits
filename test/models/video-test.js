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

    it('is required', async () => {
      const video = new Video({title: null});

      video.validateSync();

      assert.equal(video.errors.title.message, 'title is required');
    });
  });

  describe('description field', () => {
    it('is a string', async () => {
      const description = 314159;

      const video = new Video({ description });

      assert.strictEqual(video.description, description.toString());
    });
    
    it('is required', () => {
      const video = new Video({description: null});

      video.validateSync();

      assert.equal(video.errors.description.message, 'description is required');
    });
  });

  describe('url field', () => {
    it('is a string', async () => {
      const url = 54321;

      const video = new Video({ url });

      assert.strictEqual(video.url, url.toString());
    });

    it('is required', () => {
      const video = new Video({url: null});

      video.validateSync();

      assert.equal(video.errors.url.message, 'a URL is required');
    });
  });
});
