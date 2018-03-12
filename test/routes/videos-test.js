const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

require('../test-utils');

const {connectDatabase, disconnectDatabase} = require('../database-utilities'); 

const Video = require('../../models/video');

const app = require('../../app');

describe('Server path: /', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);
    
  describe('GET', () => {
    it('renders a video with a title and description', async () => {
      const title = 'Yet Another Train';
      const description =
            'Watch as another train thrills you by driving down a train track';
      const video = await Video.create({title, description});
      
      const response = await request(app).get('/').redirects();

      assert.include(response.text, title);
      assert.include(response.text, description);
    });
  });
});
