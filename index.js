#! /usr/bin/env node

const args = require('args');
const fs = require('fs');
const htmlparser = require('./modules/htmlparser');
const xmlproc = require('./modules/xml');
const xml = xmlproc.init();

args
    .option('file', 'The input file', 'Raindrop.io.html')
    .option('output', 'The output file', 'Raindrop.enex');

const flags = args.parse(process.argv);
const input = fs.createReadStream(flags.f);
const output = (flags.o === 'stdout') ? process.stdout : fs.createWriteStream(flags.o);


input.on('data', chunk => htmlparser.convert(chunk, (bookmark) => xmlproc.node(xml, bookmark)));
input.on('end', () => xmlproc.write(xml, output));


