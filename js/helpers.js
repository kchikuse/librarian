var scroll,
    spin = false, 
	initApp = _.once(function() {    
    scroll = new iScroll('wrapper', { 
        checkDOMChanges: true 
    });
});

function notify(message) {
    $('#notification').miniNotification({ 
        time: 1800,
        opacity: 0.98,
        showSpeed: 500,
        effect: 'fade'
    }).html('<p>' + message + '</p>');
}

$(function () {

    var spinner = new Spinner({
        length: 21,
        width: 7,
        radius: 21,
        color: '#236496'
    });
   
  $(document)
   .ajaxStart(function () {
        if(spin) $('.load').html(spinner.spin().el);
    })
   .ajaxStop(function () {
        if(spin) spinner.stop(); 
    })
   .ajaxError(function(event, request, settings) {
      notify('Request failed [ ' + settings.url + ' ]');
   });

});