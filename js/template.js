// TODO: support **for** and **if** control
var warpMarkup = (function () {
    var regMarkup = /{@(\w+)}/g;
    return function (markupText, instance) {
        debugger;
        return markupText.replace(regMarkup, function (match, $1) {
            if (instance[$1] === undefined) {
                return "";
            }
            return obj[$1];
        });
    }
})();

var markupString = '<div id="{@id}" class="titleBar {@cssClass}" style="{@cssText}">' + 
                       '<div class="left-toolbar">' + 
                           '</div><div class="title-text">' +
                       '</div>' + 
                       '<div class="right-toolbar">' + 
                       '</div>' + 
                   '</div>';
var obj = {
    id: '21121098',
    cssClass: 'center',
    cssText: 'border: 1px solid red;'
}
console.log(warpMarkup(markupString, obj));
