const {assert} = require('chai');

const {addNewVideo} = require('../test-utils');

describe('User visits create video page', () => {
  describe('posts a new item', () => {
    it('to the /videos URL', () => {
      browser.url('/videos/create');

      assert.include(browser.getAttribute('.input-form', 'action'), '/videos');
    });
    it('and sees title rendered', () => {
      const {title, description} = addNewVideo({page: null});

      assert.include(browser.getText('body'), title);
      assert.include(browser.getText('body'), description);
    });
  });
});
