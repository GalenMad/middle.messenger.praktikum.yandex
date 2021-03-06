import { JSDOM } from 'jsdom';
import XMLHttpRequest from 'xhr2';

const html = '<!DOCTYPE html><body><div id="app"></div></body>';
const config = {
  url: 'https://localhost/',
  contentType: 'text/html',
};
const jsdom = new JSDOM(html, config);
const { window } = jsdom;
const { document, FormData } = window;
Object.assign(global, {
  document, window, XMLHttpRequest, FormData,
});
