const {assert} = require('chai');

require('../test-utils');

describe('User deleting a video', () => {
  describe('removes a video', () => {
    it('from the list', () => {
      const title = "My first title";
      const description = "A long description of some interesting train video";
      const url = 'https://www.youtube.com/embed/Yn5Ie1FSDqk';

      browser.url('/videos/create.html');
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#url-input', url);
      browser.click('#submit-button');
      browser.click('#delete');

      assert.notInclude(browser.getText('body'), description);
      assert.notInclude(browser.getText('body'), "Not Found");
    });
  });
});
