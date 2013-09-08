app.controller('BookListCtrl', ['$scope', 'nav', 'http', function($scope, nav, http) {

    http.get('api', function(books){
    	$scope.books = books;         
        $scope.$apply();
        nav.saveBooks(books);
        $scope.$emit('books-loaded');
    });

}]);

app.controller('BookEditCtrl', ['$scope', '$routeParams', 'http', function($scope, $routeParams, http) {
    
    http.get('api/' + $routeParams.id, function(book){
    	$scope.book = book;
    	$scope.$apply();
        $scope.$emit('book-loaded');
    });

}]);