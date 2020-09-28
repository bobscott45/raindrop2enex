const xmlbuilder = require('xmlbuilder');
const moment = require('moment');

exports.create = function() {
    return xmlbuilder.create('en-export',
        {
            version: '1.0',
            encoding: 'UTF-8',
            standalone: true,
            headless: false,
            pubID: '',
            sysID: 'http://xml.evernote.com/pub/evernote-export3.dtd'
        })
        .att('export-date', moment().toISOString())
        .att('application', 'raindrop2enix')
        .att('version', '1.0');
}

exports.node = function(xml, bookmark) {
    let note = xml.ele('note');
    note.ele('title', bookmark.title);
    note.ele('content').dat(content(bookmark.url, bookmark.description));
    note.ele('created', bookmark.date_added);
    note.ele('updated', bookmark.last_modified);
    let tags = bookmark.tags.split(',');
    tags.forEach(tag => note.ele('tag', tag));
}

exports.toString = function(xml) {
    return xml.end({pretty: true});
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