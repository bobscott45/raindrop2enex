const fs = require('fs');
const htmlparser = require('./modules/htmlparser');
const xmlproc = require('./modules/xml');
const xml = xmlproc.create();

const html = fs.readFileSync('Raindrop.io.html', 'utf8');
htmlparser.convert(html, (bookmark) => xmlproc.node(xml, bookmark));
console.log(xmlproc.toString(xml));
