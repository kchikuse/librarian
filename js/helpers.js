var spinner = new Spinner({ 
    length: 15, 
    width: 8,
    radius: 23, 
    trail: 27, 
    color: '#9EF690',
    className: 'spinner' 
  }),

  initApp = _.once(function() {    
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
  else $('#loader').after(spinner.spin().el).show();
}

String.prototype.validCover = function () {
  return this.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp)$/);
};

$(function () {

  $(document)
   .ajaxStart(function () {})
   .ajaxStop(function () {})
   .ajaxError(function(event, request, settings) {
      load(false);
      error('Request failed [ ' + settings.url + ' ]');
   });

});