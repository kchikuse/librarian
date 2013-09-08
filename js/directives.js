app.directive('digits', function () {    
    return {
        link: function (scope, element, attr) {            
            element.bind('keydown', function (e) { 
                var key = e.keyCode;
                if (_.contains([ 8, 9, 13, 27, 46 ], key)) {
                    return;
                }
                else {
                    if (e.shiftKey || (key < 48 || key > 57) && (key < 96 || key > 105)) {
                        e.preventDefault();
                    }
                }
            }); 
        } 
    }
});

app.directive('cover', function () {
    return {
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

app.directive('rating', function () {
    return function (scope, element) {
        scope.$on('book-loaded', function() {
           element.raty({
                size: 24,
                number: 5,
                readOnly: true,
                path: 'assets/raty',
                score: scope.book.Rating
            });
        });
    };
});

app.directive('browse', ['nav', function (nav) {
    return {
        link: function (scope, element, attr) {            
            scope.$on('book-loaded', function() { 
                var id = scope.book.Id; 

                element.focus().bind('keydown', function (e) {                                                       
                    switch (e.keyCode || e.which) {
                        case 37:
                        nav.redirect(id, 'L');
                        break;

                        case 39:
                        nav.redirect(id, 'R');
                        break;

                        case 27:
                        case 36:
                        nav.redirect(id);
                        break;
                    }
                }).bind('mousewheel', function(e) {
                    nav.redirect(id, e.originalEvent.wheelDelta / 120 > 0 ? 'L' : 'R');
                });

                var el = $(element).hammer();

                el.on('swipeleft', function() {
                    nav.redirect(id, 'L');
                });

                el.on('swiperight', function() {
                    nav.redirect(id, 'R')
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
        }).on('dragenter', function () {
            element.addClass('over');
        }).on('dragleave', function () {
            element.removeClass('over');
        }).on('mouseleave', function() {
            element.removeClass('over');
        });
    };
}]);

app.directive('submit', ['http', function (http) {
    return function (scope, element) {
       element.bind('click', function(){
            http.put('api/update', scope.book, function(result){
                if(result === 'false') {
                    notify('failed to save the changes');
                }
            });
        });
    };
}]);