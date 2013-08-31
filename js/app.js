var app = $.sammy('#content', function () {

    this.use('Handlebars', 'html');

    this.mapRoutes([
        ['get', '/', index],
        ['get', /.*/, error]
    ]);  
    
});

$(function () {
   app.run();
});