var app = angular.module('bookmodule', []);
	
app.config(['$routeProvider', function ($routeProvider) {
		
	$routeProvider.
	    when('/', {
			controller: 'ListCtrl',
			templateUrl: 'partials/hello.html'
		}).
		when('/edit/:id', {
			controller: 'EditCtrl',
			templateUrl: 'partials/edit.html'
		}).	
	    when('/:id', {
			controller: 'EditCtrl',
			templateUrl: 'partials/detail.html'
		}).
		otherwise({
			redirectTo: '/'
		});		
		
}]);