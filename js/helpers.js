$(function () {
   
   bindEvents();
   initScroll();

});

var store, scroll,
    initScroll = _.once(function() {
    store = window.sessionStorage;
    scroll = new iScroll('wrapper', { 
        checkDOMChanges: true 
    });
});

function notify(text) {
    smoke.alert(text);
}

function enableScroll(state){
    if(state === false){
        scroll.disable();
    }
    else {
        scroll.enable();
    }
}

$.fn.sortByKey = function(key) {
    return this.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return x < y ? -1 : (x > y ? 1 : 0);
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


function initRaty(book){
    $('#rating').raty({
        size: 24,
        number: 5,
        half: false,
        halfShow: false,
        score: book.Rating,     
        path: 'assets/raty',           
        click: function (score) {
            $.ajax({                
                type: 'POST',
                url: 'api/rate',   
                dataType: 'json',  
                data: {
                    id: book.Id,
                    score: score
                },           
                error: function (err) {
                    notify(err.statusText);
                }
            });
        }
    });
}

function bindEvents() {
    var el = $('#content').hammer();

    el.on("swipeleft", function() {
       navigate('L');
    })
    .on("swiperight", function() {
       navigate('R');
    });

    $(document).on('keydown', function(e) {
        var keyCode = e.keyCode || e.which;

        switch (keyCode) {
            case 37:
            navigate('L');
            break;

            case 39:
            navigate('R');
            break;

            case 27:
            case 36:
            location.hash = '#/';
            break;
        }
    })
    .bind('mousewheel', function(e){
        if(e.originalEvent.wheelDelta / 120 > 0) {
            navigate('L');
        }
        else {
            navigate('R');
        }
    });
}

function navigate(direction){
    if($('.bookdata').length) {

        var list = store.getItem('nav').split(','),
            id = location.hash.split('/').pop(), 
            idx = list.indexOf(id);

        if(direction === 'L') {            
            var previd = idx > 0 ? list[idx - 1] : _.last(list);
            go(previd);
        }

        if(direction === 'R') {             
            var nextid = idx < list.length - 1 ? list[idx + 1] : _.first(list);
            go(nextid);
        }
    }
}

function go(id) {
    location.hash = '#/v/' + id;
}

Handlebars.registerHelper('IF_EQUAL', function (a, b, opts) {
    if (a == b) 
        return opts.fn(this);
    else
        return opts.inverse(this);
});