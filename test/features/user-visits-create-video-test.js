const {assert} = require('chai');

require('../test-utils');

describe('User visits create video page', () => {
  describe('posts a new item', () => {
    it('to the /videos URL', () => {
      browser.url('/videos/create');

      assert.include(browser.getAttribute('.input-form', 'action'), '/videos');
    });
    it('and sees title rendered', () => {
      const title = "My first title";
      const description = "A long description of some interesting train video";
      const url = 'https://www.youtube.com/watch?v=3EGOwfWok5s';
      browser.url('/videos/create');

      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#url-input', url);
      browser.click('#submit-button');

      assert.include(browser.getText('body'), title);
      assert.include(browser.getText('body'), description);
    });
  });
});
