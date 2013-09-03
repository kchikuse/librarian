var app = angular.module('bookmodule', []);
	
app.config(['$routeProvider', function ($routeProvider) {
		
	$routeProvider.
	    when('/', {
			controller: 'BookListCtrl',
			templateUrl: 'partials/hello.html'
		}).
	    when('/:id', {
			controller: 'BookDetailCtrl',
			templateUrl: 'partials/detail.html'
		}).		
		otherwise({
			redirectTo: '/'
		});		
		
}]);