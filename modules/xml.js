const xmlbuilder = require('xmlbuilder');

exports.create = function() {
    return xmlbuilder.create('en-export',
        {version: '1.0', encoding: 'UTF-8', standalone: true, headless: false});
}

exports.node = function(xml, bookmark) {
    var note = xml.ele('note');
    note.ele('title', bookmark.title);
    note.ele('content').dat(content(bookmark.url, bookmark.description));
    note.ele('created', bookmark.date_added);
    note.ele('updated', bookmark.last_modified);
    note.ele('tag', bookmark.tags);
}

exports.toString = function(xml) {
    return xml.end({pretty: true});
}

function content(url, description) {
    var content = '<?xml version="1.0" encoding="utf-8" standalone="no"?>';
    content += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
    content += '<en-note style="word-wrap: break-word; -webkit-nbsp-mode: space; -webkit-line-break: after-white-space;">';
    content += '<a href="' + url + '">' + url + '</a>';
    content += '<div>' + description + '</div>';
    content += '</en-note>';
    return content;
}