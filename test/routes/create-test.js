const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const {parseTextFromHTML, parseAttributeFromHTML} = require('../test-utils');

const {connectDatabase, disconnectDatabase} = require('../database-utilities'); 

const Video = require('../../models/video');

const app = require('../../app');

describe('Server path: /videos', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);
    
  describe('POST', () => {
    it('returns 201 when posting video', async () => {
      const video = {
        title: 'This needs a title',
        url: 'https://www.youtube.com/watch?v=3EGOwfWok5s'
      };

      const response = await request(app).
            post('/videos').
            type('form').
            send(video).
            redirects();

      assert.equal(response.status, 201);
    });

    it('creates a new video and adds it to the database', async () => {
      const video = {
        title: 'A new train video',
        description: 'Oooo Cool train!  Lets look at the train now...!',
        url: 'https://www.youtube.com/watch?v=3EGOwfWok5s'
      };

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);
      const createdVideo = await Video.findOne({});

      assert.ok(createdVideo, 'Video was not added to the database');
    });

    it('saves a Video document', async () => {
      const title = 'A new train video';
      const description = 'Oooo Cool train!  Lets look at the train now...!';
      const url = 'https://www.youtube.com/watch?v=3EGOwfWok5s';
      const video = {title, description, url};

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);
      const createdVideo = await Video.findOne({});

      assert.include(createdVideo, video);
    });

    it('no video added to database when title is missing', async () => {
      const description = 'Oooo Cool train!  Lets look at the train now...!';
      const video = {description};

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);
      const createdVideo = await Video.findOne({});

      const expectedTitle = parseAttributeFromHTML(
        response.text, '#title-input', 'value');
      
      assert.isNull(createdVideo);
      assert.equal(expectedTitle, '');
    });

    it('responds with 400 if the title is missing', async () => {
      const description = 'Oooo Cool train!  Lets look at the train now...!';
      const video = {description};

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      const expectedStatus = response.status;
      
      assert.equal(expectedStatus, 400);
    });

    it('renders the create video form when title is missing', async () => {
      const description = 'Oooo Cool train!  Lets look at the train now...!';
      const video = {description};

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      const expectedFormAction = parseAttributeFromHTML(
        response.text, 'form', 'action');
      
      assert.equal(expectedFormAction, '/videos');
    });

    it('renders a validation error message when title is missing', async () => {
      const description = 'Oooo Cool train!  Lets look at the train now...!';
      const video = {description};

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      const expectedError = parseTextFromHTML(response.text, 'span');
      
      assert.include(expectedError, 'title is required');
    });

    it('renders the create video form after error preserving valid data', async () => {
      const description = 'Oooo Cool train!  Lets look at the train now...!';
      const video = {description};

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      const expectedDescription = parseTextFromHTML(
        response.text, '#description-input');
      
      assert.include(expectedDescription, description);
    });

    it('redirects new video to /vidoes/:id', async () => {
      const video = {
        title: 'A new train video',
        description: 'Oooo Cool train!  Lets look at the train now...!',
        url: 'https://www.youtube.com/watch?v=3EGOwfWok5s'
      };

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);
      const createdVideo = await Video.findOne({});

      assert.equal(response.status, 302);
      assert.equal(response.headers.location, `/videos/${createdVideo._id}`);
    });

    it('renders URL value when title is missing', async () => {
      const description = 'Oooo Cool train!  Lets look at the train now...!';
      const url = 'https://www.youtube.com/watch?v=3EGOwfWok5s';
      const video = {description, url};

      const response = await request(app).
            post('/videos').
            type('form').
            send(video);

      const expectedUrl = parseAttributeFromHTML(
        response.text, '#url-input', 'value');
      
      assert.include(expectedUrl, url);
    });
  });
});
