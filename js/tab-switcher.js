// TODO: 1. support a flexible markupString template 
//       2. support more flexible event such as mouseover, or click or event
//       automatically timer interval switch 
//       3. should not depend on other js lib
(function () {
    function TABView(props) {
        if (this.init) {
            this.init(props);
        }
    }
    // TODO: overwrite property?
    function mixin(obj, config) {
        for (var props in config) {
            obj[props] = config[props];
        }
        return obj;
    }
    // default config properties
    mixin(TABView.prototype, {
        scriptClass: 'TABView',
        items: null,
        // use markupString as template to build DOM
        markupString: '<div>' + 
                         '<ul class="{@cssClass}" style="{@cssStyle}"></ul>' + 
                         '<div></div>' +
                       '</div>',
        markupSlots: {
            listNode: 'this.domNode.firstChild',
            contentNode: 'this.domNode.secondChild'
        },
        cssClass: '',
        cssStyle: '',
        init: function (props) {
            mixin(this, props);
        },
        render: function () {
            if (!this.placeHolder) {
                return;
            }
            var ph = document.querySelector('#' + this.placeHolder);
            // var node = document.createDocumentFragment();
            ph.innerHTML = this.buildDOM();
            var divs = document.querySelectorAll('div', ph);
            divs = [].slice.call(divs, 1);
            this.selIndex = this.selIndex || 0;
            divs[this.selIndex].className = 'show';
            // ph.appendChild(node);

            // setup DOM event
            // TODO: should be removed out
            var titles = document.querySelectorAll('li', ph);
            titles = [].slice.call(titles, 0);
            titles.forEach(function (title, index) {
                title.addEventListener('mouseover', function (evt) {
                    divs.forEach(function (div) {
                        div.className = '';
                    });
                    this.selIndex = index;
                    divs[index].className = 'show';
                }, false);
            });
        },
        buildDOM: function () {
            var html = '<ul class="notice-tit">',
                items = this.items,
                i, len = items.length;
            // TODO: template should support a loop and indicate what info should be looped
            for (i = 0; i < len; i++) {
                html += this.getItemMarkup(items[i]);
            }
            html += '</ul>';
            for (i = 0; i < len; i++) {
                html += ('<div>' + items[i].content + '</div>');
            }
            return html;
        },
        getItemMarkup: function (item) {
            return '<li><a href="#" target="_blank">' + item.title + '</a></li>';
        }
    });
}());
