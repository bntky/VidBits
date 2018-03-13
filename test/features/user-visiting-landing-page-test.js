const {assert} = require('chai');

require('../test-utils');

const generateRandomUrl = (domain) => {
  return `http://${domain}/${Math.random()}`;
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

      browser.click('a[href="videos/create.html"]');

      assert.include(browser.getText('body'), 'Save a video');
    });
  });
  describe('creates a new video', () => {
    it('and sees video on the root page', () => {
      const title = "My first title";
      const description = "A long description of some interesting train video";
      const url = generateRandomUrl('www.youtube.com');
      browser.url('/videos/create.html');

      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#url-input', url);
      browser.click('#submit-button');
      browser.url('/');

      assert.include(browser.getText('body'), title);
      assert.include(browser.getText('body'), description);
      assert.include(browser.getAttribute('.video-player', 'src'), url);
    });
  });

  describe('with an existing video', () => {
    it('can navigate to a video', () => {
      const video = {
        title: 'A Train vidoe',
        description: 'Train drives down train tracks.  Honks horn.',
        url: generateRandomUrl('www.youtube.com')
      };
      browser.url('/videos/create.html');
      browser.setValue('#title-input', video.title);
      browser.setValue('#description-input', video.description);
      browser.setValue('#url-input', video.url);
      browser.click('#submit-button');
      browser.url('/');

      assert.equal(browser.getText('.show-video'), video.title);
    });
  });
});
