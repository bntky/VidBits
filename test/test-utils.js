const {jsdom} = require('jsdom');

var colors = require('mocha/lib/reporters/base').colors;
colors['pass'] = '97';
colors['fast'] = '97';
colors['light'] = '97';
colors['diff gutter'] = '97';
colors['error stack'] = '97';

const parseAttributeFromHTML = (htmlAsString, selector, attribute) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);

  if (selectedElement === null) {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }

  const attrValue = selectedElement.getAttribute(attribute);

  if (attrValue === null) {
    throw new Error(`No attribute ${attribute} on element ${selector} in HTML string`);
  }

  return attrValue;
};

const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

module.exports = {
  parseAttributeFromHTML,
  parseTextFromHTML
}
