'use strict';

const puppeteer = require('puppeteer');

module.exports = async (name, description) => {
  const browser = await puppeteer.launch();
  const logo = await browser.newPage();
  const social = await browser.newPage();

  await logo.setContent(`
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css?family=Karla:400i,700&display=swap');

          html, body {
            width: max-content;
            height: max-content;
            display: flex;
            font-family: 'Karla', sans-serif;
            font-weight: 400;
            text-align: center;
          }

          .target {
            margin: auto;
            padding: 20px;
          }

          h1 {
            font-size: 60px;
            letter-spacing: -4.65px;
            line-height: 118px;
            margin: auto;
            border-bottom: 4px solid ${colorFromString(name)};
            display: table;
          }
        </style>
      </head>

      <body>
        <div class="target">
          <h1>${name}</h1>
        </div>
      </body>
    </html>
  `);

  await social.setContent(`
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css?family=Karla:400i,700&display=swap');

          html, body {
            width: max-content;
            height: max-content;
            display: flex;
            font-family: 'Karla', sans-serif;
            font-weight: 400;
          }

          .target {
            width: 640px;
            height: 320px;
            margin: auto;
            padding: 40px;
          }

          h1 {
            font-size: 60px;
            letter-spacing: -4.65px;
            line-height: 118px;
            border-bottom: 4px solid ${colorFromString(name)};
            display: table;
          }

          p {
            font-size: 28px;
            font-style: italic;
            letter-spacing: 0.35px;
          }
        </style>
      </head>

      <body>
        <div class="target">
          <h1>${name}</h1>
          <p>${description}</p>
        </div>
      </body>
    </html>
  `);

  await takeScreenshot(logo, 'logo');
  await takeScreenshot(social, 'social');

  await browser.close();
};

function bound (int, min, max) {
  return ((int - min) % (max - min)) + min;
}

function colorFromString(str) {
  const hash = str.split('').reduce((hash, char) => {
    return hash + char.charCodeAt(0);
  }, 0);

  const hue = [0, 360];
  const sat = [70, 90];
  const lit = [50, 70];

  const h = bound(hash, hue[0], hue[1]);
  const s = bound(hash, sat[0], sat[1]);
  const l = bound(hash, lit[0], lit[1]);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

async function takeScreenshot(page, name) {
  const { width, height } = await page.evaluate(() => {
    const { width, height } = getComputedStyle(document.querySelector('.target'));

    return {
      width: Math.ceil(width.replace('px', '')),
      height: Math.ceil(height.replace('px', '')),
    }
  });

  await page.setViewport({
    width,
    height,
    deviceScaleFactor: 2,
  });

  const element = await page.$('.target');

  await element.screenshot({ path: `${name}-${width}x${height}@2x.png` });
}
