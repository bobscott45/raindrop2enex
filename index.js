const fs = require('fs');
const htmlparser2 = require('htmlparser2');
const xmlbuilder = require('xmlbuilder');

var tags = {
    h1: false,
    dd: false,
    h3: false,
    a: false,
};

var bookmark = {
    container: '',
    title: '',
    description: '',
    tags: '',
    url: '',
    date_added: '',
    last_modified: ''
};


var container = null;

const parser = new htmlparser2.Parser({
    onopentag(name, attribs){
        if(tags.hasOwnProperty(name)) {
            tags[name] = true;
            if(tags.a) {
                if (bookmark.url) {
                    xmlNode(bookmark);
                }
                bookmark.url = attribs.href;
                bookmark.date_added = new Date(attribs.add_date * 1000);
                bookmark.last_modified = new Date(attribs.last_modified * 1000);
                bookmark.tags = attribs.tags;
                bookmark.title = '';
                bookmark.description = '';
            }
        }
    },
    ontext(text) {
        if(tags.h1) {
            console.log('Processing ', text);
        }
        if(tags.h3) {
            bookmark.container = text;
        }
        if(tags.a) {
            bookmark.title = text;
        }
        if(tags.dd) {
            bookmark.description = text;
            tags.dd = false;
        }
    },
    onclosetag(name) {
        if(tags.hasOwnProperty(name)) {
            tags[name] = false;
        }
    }
});

function xmlNode(bookmark) {
    var note = xml.ele('note');
    note.ele('title', bookmark.title);
    note.ele('content').dat(createContent(bookmark.url, bookmark.description));
    note.ele('created', bookmark.date_added);
    note.ele('updated', bookmark.last_modified);
    note.ele('tag', bookmark.tags);
}

function createContent(url, description) {
    var content = '<?xml version="1.0" encoding="utf-8" standalone="no"?>';
    content += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
    content += '<en-note style="word-wrap: break-word; -webkit-nbsp-mode: space; -webkit-line-break: after-white-space;">';
    content += '<a href="' + url + '">' + url + '</a>';
    content += '<div>' + description + '</div>';
    content += '</en-note>';
    return content;
}

var xml = xmlbuilder.create('en-export',
    {version: '1.0', encoding: 'UTF-8', standalone: true, headless: false});
let contents = fs.readFileSync('Raindrop.io.html', 'utf8');

parser.write(contents);
parser.end();
var xmlString = xml.end({pretty: true});
console.log(xmlString);
