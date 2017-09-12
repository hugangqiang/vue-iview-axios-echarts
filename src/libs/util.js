

let util = {

};
util.title = function(title) {
    title = title ? title + ' - oa' : 'oa';
    window.document.title = title;
};



export default util;