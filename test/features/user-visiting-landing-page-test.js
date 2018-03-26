const {assert} = require('chai');

const {addNewVideo} = require('../test-utils');

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
      const {title, description, url} = addNewVideo();

      assert.include(browser.getText('body'), title);
      assert.include(browser.getText('body'), description);
      assert.include(browser.getAttribute('.video-player', 'src'), url);
    });
  });

  describe('with an existing video', () => {
    it('can navigate to a video', () => {
      const {title} = addNewVideo();
      
      assert.equal(browser.getText('.show-video'), title);
    });
  });
});
