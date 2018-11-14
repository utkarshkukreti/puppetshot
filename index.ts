#!/usr/bin/env node

import * as puppeteer from 'puppeteer';
import * as yargs from 'yargs';

const argv = yargs
  .option('url', {
    describe: 'the url of the page',
    demandOption: true,
  })
  .option('width', {
    type: 'number',
    describe: 'viewport width in pixels',
    default: 1024,
  })
  .option('height', {
    type: 'number',
    describe: 'viewport height in pixels',
    default: 800,
  })
  .option('output', {
    alias: 'o',
    describe: 'output file path',
    default: 'screenshot.png',
  })
  .help().argv;

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    timeout: 1000,
    defaultViewport: {
      width: argv.width,
      height: argv.height,
      deviceScaleFactor: 2,
    },
  });
  const page = await browser.newPage();
  await page.goto(argv.url);
  const scrollHeight = await page.evaluate(
    () => document.documentElement!.scrollHeight
  );
  await page.screenshot({
    path: argv.output,
    clip: { x: 0, y: 0, width: argv.width, height: scrollHeight },
  });
  await browser.close();
})().catch(console.error);
