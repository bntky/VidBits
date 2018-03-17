const {assert} = require('chai');

require('../test-utils');

describe('User updating a video', () => {
  describe('changes the values', () => {
    it('of the title and sees new title rendered', () => {
      const title = "My first title";
      const description = "A long description of some interesting train video";
      const url = 'https://www.youtube.com/watch?v=3EGOwfWok5s';
      const newTitle = 'Change the title to something else';

      browser.url('/videos/create.html');
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#url-input', url);
      browser.click('#submit-button');
      browser.click('#edit');
      browser.setValue('#title-input', newTitle);
      browser.click('#submit-button');

      assert.include(browser.getText('body'), newTitle);
    });

    it('of title and does not see old title on landing page', () => {
      const title = "My first title";
      const description = "A long description of some interesting train video";
      const url = 'https://www.youtube.com/watch?v=3EGOwfWok5s';
      const newTitle = 'Change the title to something else';

      browser.url('/videos/create.html');
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#url-input', url);
      browser.click('#submit-button');
      browser.click('#edit');
      browser.setValue('#title-input', newTitle);
      browser.click('#submit-button');
      browser.url("/");

      assert.notInclude(browser.getText('body'), title);
    });
  });
});
