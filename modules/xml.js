const { create } = require('xmlbuilder2');
const { select } = require('xpath');
const moment = require('moment');


exports.init = function() {
    const xmlTree = create(
        {
            version: '1.0',
            encoding: 'UTF-8',
            standalone: true
        }
        ).ele('en-export',
        {
            'export-date': moment().toISOString(),
            'application': 'raindrop2enix',
            'version': '1.0'
        });
    xmlTree.dtd({sysID: 'http://xml.evernote.com/pub/evernote-export3.dtd'});
    return xmlTree;
}

exports.node = function(xml, bookmark) {
    let note = xml.ele('note');
    note.ele('title').txt(bookmark.title);
    note.ele('content').dat(content(bookmark.url, bookmark.description));
    note.ele('created').txt(bookmark.date_added);
    note.ele('updated').txt(bookmark.last_modified);
    note.ele('tag').txt(bookmark.container);
    if(bookmark.tags !== '') {
        let tags = bookmark.tags.split(',');
        tags.forEach(tag => note.ele('tag').txt(tag));
    }
}

exports.write = function(xml, output) {
    output.write(xml.end({prettyPrint: true}));
}

function content(url, description) {
    let content = '<?xml version="1.0" encoding="utf-8" standalone="no"?>';
    content += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
    content += '<en-note style="word-wrap: break-word; -webkit-nbsp-mode: space; -webkit-line-break: after-white-space;">';
    content += '<a href="' + url + '">' + url + '</a>';
    content += '<div>' + description + '</div>';
    content += '</en-note>';
    return content;
}