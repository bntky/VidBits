const {assert} = require('chai');

require('../test-utils');

const generateRandomUrl = (domain) => {
  return `http://${domain}/${Math.random()}`;
};

const addNewVideo = (title, description, url) => {
  browser.url('/videos/create.html');
  browser.setValue('#title-input', title);
  browser.setValue('#description-input', description);
  browser.setValue('#url-input', url);
  browser.click('#submit-button');
  browser.url('/');
};

describe('User comments', () => {
  describe('on an existing video', () => {
    it('starts blank', () => {
      const title = 'A Train vidoe';
      const description = 'Train drives down train tracks.  Honks horn.';
      const url = generateRandomUrl('www.youtube.com');
      addNewVideo(title, description, url);
      browser.click('.show-video');

      assert.equal(browser.getText('#comments-container'), '');
    });
  });

  describe('posted to an exiting video', () => {
    it('POST to the /videos/:id/comments URL', () => {
      const title = 'A Train vidoe';
      const description = 'Train drives down train tracks.  Honks horn.';
      const url = generateRandomUrl('www.youtube.com');
      addNewVideo(title, description, url);
      browser.click('.show-video');

      assert.match(browser.getAttribute('.comment-form', 'action'),
                   /\/videos\/[a-f0-9]+\/comments/);
    });

    it('appear on the video show page', () => {
      const title = 'A Train vidoe';
      const description = 'Train drives down train tracks.  Honks horn.';
      const url = generateRandomUrl('www.youtube.com');
      const comment = 'First post!';
      addNewVideo(title, description, url);
      browser.click('.show-video');
      browser.setValue('#comment-input', comment);
      browser.click('#submit-comment');

      assert.include(browser.getText('#comments-container'), comment);
    });
  });
});
