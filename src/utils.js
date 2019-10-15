function _escapeXpathString(str) {
    const splitedQuotes = str.replace(/'/g, `', "'", '`);
    return `concat('${splitedQuotes}', '')`;
}

async function getElementByText(page, text) {
    const escapedText = _escapeXpathString(text);
    const xpath = `//*[text()[contains(., ${escapedText})]]|//*[@placeholder="${text}"]|//input[@value="${text}"]`;
    const elements = await page.$x(xpath);

    return elements[0];
}

async function clickByText(page, text) {
    const elements = await getElementByText(page, text);
    if(elements) {
        await elements.click();
        return;
    }

    throw new Error(`Element not found: ${text}`);
}

async function waitForElementWithText(page, text, options = {}) {
    try {
      const escapedText = _escapeXpathString(text);
      const xpath = `//*[text()[contains(., ${escapedText})]]|//*[@placeholder="${text}"]|//input[@value="${text}"]`;
      await page.waitForXPath(xpath, options);
    } catch (e) {
        if (e.name === 'TimeoutError') {
          throw `Error waiting for element with text ${text}, and timeout ${options.timeout || 30000}`
        }

        throw e;
    }
}

module.exports = {
    clickByText,
    waitForElementWithText,
};
