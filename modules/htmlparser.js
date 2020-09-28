const htmlparser2 = require('htmlparser2');


let tags = {
    h1: false,
    dd: false,
    h3: false,
    a: false,
};

let bookmark = {
    container: '',
    title: '',
    description: '',
    tags: '',
    url: '',
    date_added: '',
    last_modified: ''
};

var handleBookmark;

const htmlparser = new htmlparser2.Parser({
    onopentag(name, attribs){
        if(tags.hasOwnProperty(name)) {
            tags[name] = true;
            if(tags.a) {
                if (bookmark.url) {
                    handleBookmark(bookmark);
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

exports.convert = function(content, addNodeCallback) {
    handleBookmark = addNodeCallback;
    htmlparser.write(content);
}