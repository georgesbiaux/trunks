const puppeteer = require('puppeteer-core');
const { invoke } = require('./src/test-script');

function getArgumentValue(argumentName) {
  const nameIndex = process.argv.indexOf(argumentName);

  if (nameIndex > -1) {
    return process.argv[nameIndex + 1];
  }

  return undefined;
}

(async () => {
  try {
    const chromiumPath = getArgumentValue('--chromium-path');

    if (!chromiumPath) {
      console.log('Missing argument --chromium-path');
      process.exit(1);
    }

    const chromiumOptions = {
      executablePath: chromiumPath,
      headless: false,
    };

    const browser = await puppeteer.launch(chromiumOptions);

    const start = Date.now();
    await invoke(browser);
    const duration = Date.now() - start;

    browser.close();
    console.log('duration: ', duration);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
