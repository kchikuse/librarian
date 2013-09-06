/* stop angular from loading just the folder path and throwing a 404 */
app.directive('bookcover', function () {
    return {
        restrict: 'C',
        link: function (scope, element, attr) {            
            scope.$on('book-loaded', function() {                
                element.attr('src', element.attr('source') + scope.book.Thumbnail);
            });    
        } 
    };
});

app.directive('init', ['$timeout', function ($timeout) {
    return {
        link: function (scope) {
            scope.$on('books-loaded', function () {
                $timeout(initApp, 0, false);
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
                    }).error(function(){
                        notify('failed to rate book');
                    });
                }
            });
        });
    };
}]);

app.directive('nav', ['navService', function (navService) {
    return {
        link: function (scope, element, attr) {            
            scope.$on('book-loaded', function() { 
                var id = scope.book.Id; 

                element.focus().bind('keydown', function (e) {                                                       
                    switch (e.keyCode || e.which) {
                        case 37:
                        navService.nav(id, 'L');
                        break;

                        case 39:
                        navService.nav(id, 'R');
                        break;

                        case 27:
                        case 36:
                        navService.nav(id);
                        break;
                    }
                }).bind('mousewheel', function(e) {
                    navService.nav(id, e.originalEvent.wheelDelta / 120 > 0 ? 'L' : 'R');
                });

                var el = $(element).hammer();

                el.on('swipeleft', function() {
                    navService.nav(id, 'L');
                });

                el.on('swiperight', function() {
                    navService.nav(id, 'R')
                });
            });    
        },    
    };
}]);

app.directive('drop', ['$window', function ($window) {
    return function (scope, element, attr) {
        element.on('drop', function (e) {
            e.originalEvent.stopPropagation();
            e.originalEvent.preventDefault();

            var files = e.originalEvent.dataTransfer.files;

            if (!files.length) {
                return;
            }

            if ($window.FormData !== undefined) {
                var data = new $window.FormData();
                
                data.append('file', files[0]);

                $.ajax({
                    type: 'PUT',
                    data: data,
                    contentType: false,
                    processData: false,
                    url: 'api/cover',
                    success: function (file) {
                        scope.book.thumbnail = file;                        
                        scope.$apply();
                    },
                    error: function () {
                        notify('failed to save cover');
                    }
                }).always(function() {
                    element.removeClass('over');
                });

            } else {
                console.log("this browser is too old");
            }

        }).on('dragover', function (e) {
            e.preventDefault();
        }).on('dragenter', function (e) {
            element.addClass('over');
        }).on('dragleave', function (e) {
            element.removeClass('over');
        });
    };
}]);

app.directive('digits', function () {    
    return {
        link: function (scope, element, attr) {            
            element.bind('keydown', function (e) { 
                if (_.contains([ 8, 9, 13, 27, 46 ], e.keyCode)) {
                    return;
                }
                else {
                    if (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
                        e.preventDefault();
                    }
                }
            }); 
        } 
    }
});