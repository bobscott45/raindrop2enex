const fs = require('fs');
const html2xml = require('./modules/html2xml');

let html = fs.readFileSync('Raindrop.io.html', 'utf8');
let xml = html2xml.toXML(html);

console.log(xml);
