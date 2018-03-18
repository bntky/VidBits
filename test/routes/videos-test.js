const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const {parseAttributeFromHTML, parseTextFromHTML} = require('../test-utils');

const {connectDatabase, disconnectDatabase, fakeId, generateNewVideo} = require('../database-utilities'); 

const Video = require('../../models/video');

const app = require('../../app');

describe('Server path: /', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);
    
  describe('GET', () => {
    it('renders a video with a title and description', async () => {
      const video = await Video.create(generateNewVideo());
      
      const response = await request(app).get('/').redirects();

      assert.include(response.text, video.title);
      assert.include(response.text, video.description);
    });
  });
});

describe('Server path: /videos/:id', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders video by ID', async () => {
      const video = await Video.create(generateNewVideo());

      const response = await request(app).get(`/videos/${video._id}`);
      const expectedTitle = parseTextFromHTML(response.text, '.video-title');
      const expectedDescription = parseTextFromHTML(
        response.text, '.video-description');
      const expectedUrl = parseAttributeFromHTML(
        response.text, '.video-player', 'src');

      assert.include(expectedTitle, video.title);
      assert.include(expectedDescription, video.description);
      assert.equal(expectedUrl, video.url);
    });

    it('returns a 404 status for nonexistent videos', async () => {
      const videoId = fakeId();

      const response = await request(app).get(`/videos/${videoId}`);

      assert.equal(response.status, 404);
    });

    it('renders reasonable error page when video is missing', async () => {
      const videoId = fakeId();

      const response = await request(app).get(`/videos/${videoId}`);

      assert.include(parseTextFromHTML(response.text, 'h1'), 'Video not found');
    });

    it('includes link to add page when video is missing', async () => {
      const videoId = fakeId();

      const response = await request(app).get(`/videos/${videoId}`);

      assert.include(
        parseTextFromHTML(response.text, '.add-video-button'), 'Add');
    });
  });
});

describe('Server path: /videos/:id/edit', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders a form to edit the video', async () => {
      const video = await Video.create(generateNewVideo());
      
      const response = await request(app).
            get(`/videos/${video._id}/edit`).
            redirects();

      assert.include(response.text, video.title);
    });

    it('posts the edited video to /updates', async () => {
      const video = await Video.create(generateNewVideo());
      
      const response = await request(app).
            get(`/videos/${video._id}/edit`).
            redirects();
      const formAction = parseAttributeFromHTML(
        response.text, 'form', 'action');

      assert.equal(formAction, `/videos/${video._id}/updates`);
    });
  });
});
