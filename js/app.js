var app = $.sammy('#content', function () {

	this.use('Handlebars', 'html');

	this.get('#/', function (context) {
		this.load('api').then(function(items) {
			context.partial('partials/hello.html', {
				books: JSON.parse(items)
			}, enableScroll);
		});
	});

	this.get('#/v/:id', function (context) {
		var id = this.params['id'];
		this.load('api/' + id).then(function(item) {
			var book = JSON.parse(item);
			context.partial('partials/view.html', book, function(){ 	
				initRaty(book);
				enableScroll(false);
			});
		});
	});

	this.get(/.*/, function () {
		this.partial('partials/404.html');
	});

});

$(function () {
   app.run('#/');
});