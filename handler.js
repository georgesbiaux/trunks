'use strict';
const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const { invoke } = require('./src/test-script');

module.exports.exec = async () => {
  let response;
  try {
    const chromiumOptions = {
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      args: [
        ...chromium.args,
        '--no-sandbox',
      ],
    };

    const browser = await puppeteer.launch(chromiumOptions);

    const start = Date.now();
    await invoke(browser);
    const duration = Date.now() - start;

    browser.close();
    response = {
      statusCode: 200,
      body: {
        duration: duration,
      },
    };
  } catch(e) {
    console.log('ERROR', e);
    response = {
      statusCode: 200,
      body: {
        error: e,
      },
    };
  } finally {
    return response;
  }
};
