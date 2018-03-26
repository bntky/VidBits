const {assert} = require('chai');

const {addNewVideo} = require('../test-utils');

describe('User updating a video', () => {
  describe('changes the values', () => {
    it('of the title and sees new title rendered', () => {
      const newTitle = 'Change the title to something else';

      addNewVideo({page: null});
      browser.click('#edit');
      browser.setValue('#title-input', newTitle);
      browser.click('#submit-button');

      assert.include(browser.getText('body'), newTitle);
    });

    it('of title and does not see old title on landing page', () => {
      const {title} = addNewVideo({page: null});
      const newTitle = 'Change the title to something else';

      browser.click('#edit');
      browser.setValue('#title-input', newTitle);
      browser.click('#submit-button');
      browser.url("/");

      assert.notInclude(browser.getText('body'), title);
    });
  });
});
