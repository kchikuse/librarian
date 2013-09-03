app.directive('init', ['$timeout', function ($timeout) {
    return {
        link: function (scope) {
            scope.$on('books-loaded', function () {
                $timeout(initScroll, 0, false);
            });
        }
    };
}]);


app.directive('rate', ['$http', function ($http) {
    return function (scope, element) {
        scope.$on('book-loaded', function() {
           element.raty({
                size: 24,
                number: 5,
                half: false,
                halfShow: false,
                path: 'assets/raty',
                score: scope.book.Rating,            
                click: function (score) {
                    
                    $http({
                        method: 'PUT',
                        url: 'api/rate',
                        data: { 
                            score: score,
                            id: scope.book.Id                       
                        },      
                    }).success(function (rating) {
                        scope.book.Rating = rating;
                    });

                }
            });
        });
    };
}]);