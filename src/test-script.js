const { clickByText, waitForElementWithText } = require('./utils');

async function invoke(browser) {
  const page = await browser.newPage();
  await page.goto('https://www.google.com/webhp?hl=en&gl=en', { waitUntil: 'networkidle2' });

  await page.type('input[title="Search"]', 'Chuck Norris', { delay: 20 });
  await clickByText(page, 'Google Search');

  await waitForElementWithText(page, 'Chuck Norris - Wikipedia', { visible: true, timeout: 1000 });
}

module.exports.invoke = invoke;
