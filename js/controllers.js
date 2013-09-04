app.controller('BookListCtrl', ['$scope', '$http', 'navService', function($scope, $http, navService) {
    
    $http.get('api').success(function(books) {
        $scope.books = books;
        navService.saveBooks(books);
        $scope.$emit('books-loaded');
    });

}]);

app.controller('BookDetailCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    
    $http.get('api/' + $routeParams.id).success(function(book) {
        $scope.book = book;
        $scope.$emit('book-loaded');
    });

}]);