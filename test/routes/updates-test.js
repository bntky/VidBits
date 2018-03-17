const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const {parseTextFromHTML, parseAttributeFromHTML} = require('../test-utils');

const {connectDatabase, disconnectDatabase} = require('../database-utilities'); 

const Video = require('../../models/video');

const app = require('../../app');

describe('Server path: /videos/:id/updates', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);
    
  describe('POST', () => {
    it('updates an existing video', async () => {
      const title = 'A new train video';
      const description= 'Oooo Cool train!  Lets look at the train now...!';
      const url = 'https://www.youtube.com/watch?v=3EGOwfWok5s';
      const video = new Video({title, description, url});
      await video.save();
      const newTitle = 'A newer than new train video';
      const updatedVideo = {
        title: newTitle,
        description: description,
        url: url
      };

      const response = await request(app).
            post(`/videos/${video._id}/updates`).
            type('form').
            send(updatedVideo);
      const allVideos = await Video.find({});

      assert.equal(allVideos.length, 1);
      assert.equal(allVideos[0].title, newTitle);
    });

    it('returns a 302 status after updating a video', async () => {
      const title = 'A new train video';
      const description= 'Oooo Cool train!  Lets look at the train now...!';
      const url = 'https://www.youtube.com/watch?v=3EGOwfWok5s';
      const video = new Video({title, description, url});
      await video.save();
      const newTitle = 'A newer than new train video';
      const updatedVideo = {
        title: newTitle,
        description: description,
        url: url
      };

      const response = await request(app).
            post(`/videos/${video._id}/updates`).
            type('form').
            send(updatedVideo);

      assert.equal(response.status, 302);
    });

    it('invalid updates to a video will not change the database', async () => {
      const title = 'A new train video';
      const description= 'Oooo Cool train!  Lets look at the train now...!';
      const url = 'https://www.youtube.com/watch?v=3EGOwfWok5s';
      const video = new Video({title, description, url});
      await video.save();
      const replaceVideo = {
        title: undefined,
        description: description,
        url: url
      };

      const response = await request(app).
            post(`/videos/${video._id}/updates`).
            type('form').
            send(replaceVideo);
      const updatedVideo = await Video.findById(video._id);

      assert.strictEqual(updatedVideo.title, title);
    });

    it('invalid updates to a video will not change the database', async () => {
      const title = 'A new train video';
      const description= 'Oooo Cool train!  Lets look at the train now...!';
      const url = 'https://www.youtube.com/watch?v=3EGOwfWok5s';
      const video = new Video({title, description, url});
      await video.save();
      const replaceVideo = {
        title: title,
        description: undefined,
        url: url
      };

      const response = await request(app).
            post(`/videos/${video._id}/updates`).
            type('form').
            send(replaceVideo);

      assert.equal(response.status, 400);
    });
  });
});
