var scroll,
    spin = false, 
	initApp = _.once(function() {    
    scroll = new iScroll('wrapper', { 
        checkDOMChanges: true 
    });
});

function notify(message) {
	smoke.alert(message);
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