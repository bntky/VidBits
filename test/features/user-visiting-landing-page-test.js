const {assert} = require('chai');

require('../test-utils');

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
      browser.url('/videos/create.html');

      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.click('#submit-button');
      browser.url('/');

      assert.include(browser.getText('body'), title);
      assert.include(browser.getText('body'), description);
    });
  });
});
