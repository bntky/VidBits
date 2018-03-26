const {assert} = require('chai');

const {addNewVideo} = require('../test-utils');

describe('User deleting a video', () => {
  describe('removes a video', () => {
    it('from the list', () => {
      const {description} = addNewVideo({page: null});

      browser.click('#delete');

      assert.notInclude(browser.getText('body'), description);
      assert.notInclude(browser.getText('body'), "Not Found");
    });
  });
});
