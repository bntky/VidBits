const {assert} = require('chai');

const {addNewVideo} = require('../test-utils');

describe('User comments', () => {
  describe('on an existing video', () => {
    it('starts blank', () => {
      addNewVideo();
      browser.click('.show-video');

      assert.equal(browser.getText('#comments-container'), '');
    });
  });

  describe('posted to an exiting video', () => {
    it('POST to the /videos/:id/comments URL', () => {
      addNewVideo();

      browser.click('.show-video');

      assert.match(browser.getAttribute('.comment-form', 'action'),
                   /\/videos\/[a-f0-9]+\/comments/);
    });

    it('appear on the video show page', () => {
      const comment = 'First post!';

      addNewVideo();
      browser.click('.show-video');
      browser.setValue('#comment-input', comment);
      browser.click('#submit-comment');

      assert.include(browser.getText('#comments-container'), comment);
    });
  });
});
