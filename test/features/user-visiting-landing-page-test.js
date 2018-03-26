const {assert} = require('chai');

require('../test-utils');

const generateRandomUrl = (domain) => {
  return `http://${domain}/${Math.random()}`;
};

const addNewVideo = (title, description, url) => {
  browser.url('/videos/create');
  browser.setValue('#title-input', title);
  browser.setValue('#description-input', description);
  browser.setValue('#url-input', url);
  browser.click('#submit-button');
  browser.url('/');
};

describe('User visits root', () => {
  describe('without any videos', () => {
    it('starts blank', () => {
      browser.url('/');
      assert.equal(browser.getText('#videos-container'), '');
    });
  });
  describe('and can navigate', () => {
    it('to videos/create', () => {
      browser.url('/');

      browser.click('a[href="videos/create"]');

      assert.include(browser.getText('body'), 'Save a video');
    });
  });
  describe('creates a new video', () => {
    it('and sees video on the root page', () => {
      const title = "My first title";
      const description = "A long description of some interesting train video";
      const url = generateRandomUrl('www.youtube.com');
      addNewVideo(title, description, url);

      assert.include(browser.getText('body'), title);
      assert.include(browser.getText('body'), description);
      assert.include(browser.getAttribute('.video-player', 'src'), url);
    });
  });

  describe('with an existing video', () => {
    it('can navigate to a video', () => {
      const title = 'A Train vidoe';
      const description = 'Train drives down train tracks.  Honks horn.';
      const url = generateRandomUrl('www.youtube.com');
      addNewVideo(title, description, url);
      
      assert.equal(browser.getText('.show-video'), title);
    });
  });
});
