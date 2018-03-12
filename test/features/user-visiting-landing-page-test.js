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
});
