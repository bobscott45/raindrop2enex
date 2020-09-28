const htmlparser2 = require('htmlparser2');
const moment = require('moment');

const tags = {
    dd: false,
    h3: false,
    a: false,
};

const bookmark = {
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
                bookmark.date_added = moment(attribs.add_date * 1000).toISOString();
                bookmark.last_modified = moment(attribs.last_modified * 1000).toISOString();
                bookmark.tags = attribs.tags;
                bookmark.title = '';
                bookmark.description = '';
            }
        }
    },
    ontext(text) {
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