app.controller('ListCtrl', ['$scope', 'nav', 'http', function($scope, nav, http) {
    load();
    http.get('api', function(books){    	
        load(false);
        nav.saveBooks(books);
        $scope.books = books;  
        $scope.$apply();        
        $scope.$emit('books-load');        
    });
}]);

app.controller('EditCtrl', ['$scope', '$routeParams', 'http', function($scope, $routeParams, http) {    
    http.get('api/' + $routeParams.id, function(book){
    	$scope.book = book; 
        $scope.$apply();    	
        $scope.$emit('book-load', book);       
    });
}]);