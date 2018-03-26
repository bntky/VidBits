const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const {parseTextFromHTML, parseAttributeFromHTML} = require('../test-utils');

const {connectDatabase, disconnectDatabase, generateNewVideo} = require('../database-utilities'); 

const Video = require('../../models/video');

const app = require('../../app');

describe('Server path: /videos', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);
    
  describe('POST', () => {
    it('returns 201 when posting video', async () => {
      const video = generateNewVideo();

      const response = await request(app).
            post('/videos').
            type('form').
            send(video).
            redirects();

      assert.equal(response.status, 201);
    });

    it('creates a new video and adds it to the database', async () => {
      const video = generateNewVideo();

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);
      const createdVideo = await Video.findOne({});

      assert.ok(createdVideo, 'Video was not added to the database');
    });

    it('saves a Video document', async () => {
      const video = generateNewVideo();

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);
      const createdVideo = await Video.findOne({});

      assert.include(createdVideo, video);
    });

    it('no video added to database when title is missing', async () => {
      const video = generateNewVideo({title: null});

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);
      const createdVideo = await Video.findOne({});

      const title = parseAttributeFromHTML(
        response.text, '#title-input', 'value');

      assert.isNull(createdVideo);
      assert.equal(title, '');
    });

    it('responds with 400 if the title is missing', async () => {
      const video = generateNewVideo({title: null});

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      assert.equal(response.status, 400);
    });

    it('renders the create video form when title is missing', async () => {
      const video = generateNewVideo({title: null});

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      const formAction = parseAttributeFromHTML(
        response.text, 'form', 'action');
      
      assert.equal(formAction, '/videos');
    });

    it('renders a validation error message when title is missing', async () => {
      const video = generateNewVideo({title: null});

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      const resultError = parseTextFromHTML(response.text, 'span');
      
      assert.include(resultError, 'title is required');
    });

    it('renders the description value when title is missing', async () => {
      const video = generateNewVideo({title: null});

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      const description = parseTextFromHTML(
        response.text, '#description-input');
      
      assert.include(description, video.description);
    });

    it('redirects new video to /vidoes/:id', async () => {
      const video = generateNewVideo();

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);
      const createdVideo = await Video.findOne({});

      assert.equal(response.status, 302);
      assert.equal(response.headers.location, `/videos/${createdVideo._id}`);
    });

    it('renders URL value when title is missing', async () => {
      const video = generateNewVideo({title: null});

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      const url = parseAttributeFromHTML(
        response.text, '#url-input', 'value');
      
      assert.include(url, video.url);
    });

    it('renders a validation message when URL is missing', async () => {
      const video = generateNewVideo({url: null});

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      const resultError = parseTextFromHTML(response.text, 'span');
      
      assert.include(resultError, 'a URL is required');
    });

    it('renders the title when description is missing', async () => {
      const video = generateNewVideo({description: null});

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      const title = parseAttributeFromHTML(
        response.text, '#title-input', 'value');

      assert.include(title, video.title);
    });

    it('renders a validation message when description is missing', async () => {
      const video = generateNewVideo({description: null});

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      const resultError = parseTextFromHTML(response.text, 'span');

      assert.include(resultError, 'description is required');
    });
  });
});
