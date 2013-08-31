var scroll;

function initScroll() {
  scroll = new iScroll('wrapper', { checkDOMChanges: true });
}

function error(text) {
    smoke.alert(text);
}

function notify(text) {
    smoke.alert(text);
}

$.fn.sortByKey = function(key) {
    return this.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


Handlebars.registerHelper('HELPER', function (id) {
    return new Handlebars.SafeString(id);
});