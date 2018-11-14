"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const yargs = require("yargs");
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
(() => __awaiter(this, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({
        headless: true,
        timeout: 1000,
        defaultViewport: {
            width: argv.width,
            height: argv.height,
            deviceScaleFactor: 2,
        },
    });
    const page = yield browser.newPage();
    yield page.goto(argv.url);
    const scrollHeight = yield page.evaluate(() => document.documentElement.scrollHeight);
    yield page.screenshot({
        path: argv.output,
        clip: { x: 0, y: 0, width: argv.width, height: scrollHeight },
    });
    yield browser.close();
}))().catch(console.error);
