const args = require('args');
const fs = require('fs');
const htmlparser = require('./modules/htmlparser');
const xmlproc = require('./modules/xml');
const xml = xmlproc.create();

args
    .option('input', 'The input file', 'Raindrop.io.html')
    .option('output', 'The output file', 'stdout');

const flags = args.parse(process.argv);

const html = fs.readFileSync(flags.i, 'utf8');
htmlparser.convert(html, (bookmark) => xmlproc.node(xml, bookmark));
const output = xmlproc.toString(xml);
if(flags.o === 'stdout') {
    console.log(output);
} else {
    fs.writeFileSync(flags.o, output);
}

