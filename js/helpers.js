var converter = new Showdown.converter(),
    spinner = new Spinner({ 
    length: 15, 
    width: 8,
    radius: 23, 
    trail: 27, 
    color: '#9EF690',
    className: 'spinner' 
  }), 
  init = _.once(function() {    
      app.scroller = new iScroll('wrapper', {
        useTransform: false,
        checkDOMChanges: true,
        onBeforeScrollStart: function (e) {
            var target = e.target;
            while (target.nodeType != 1) target = target.parentNode;
            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
              e.preventDefault();
          }
        }
    });
});

function error(message) {
  notify(message, 'error');
}

function notify(message, type) {
  $('#notification').miniNotification({ 
    time: 1800,
    opacity: 0.98,
    showSpeed: 500
  }).html('<p class="'+ (type || 'success') +'">' + message + '</p>');
}

function load(state) {  
  if(state === false) {
    spinner.stop();
    $('#loader').hide();
  }
  else { 
    $('#loader').after(spinner.spin().el).show();
  }
}

function validCover (cover) {
  return cover.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp)$/);
};

$(function () {

  $(document)
   .ajaxError(function(event, request, settings) {
      error('Request failed [ ' + settings.url + ' ]');
   });

});