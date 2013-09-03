app.controller('BookListCtrl', ['$scope', '$http', function($scope, $http) {
    
    $http.get('api').success(function(books) {
        $scope.books = books;
        $scope.$emit('books-loaded');
    });

}]);

app.controller('BookDetailCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $http.get('api/' + $routeParams.id).success(function(book) {
        $scope.book = book;
        $scope.$emit('book-loaded');
    });

}]);