var app = angular.module('bookmodule', []);
	
app.config(['$routeProvider', function ($routeProvider) {
		
	$routeProvider.
	    when('/', {
			controller: 'BookListCtrl',
			templateUrl: 'partials/hello.html'
		}).
		when('/edit/:id', {
			controller: 'BookEditCtrl',
			templateUrl: 'partials/edit.html'
		}).	
	    when('/:id', {
			controller: 'BookEditCtrl',
			templateUrl: 'partials/detail.html'
		}).
		otherwise({
			redirectTo: '/'
		});		
		
}]);