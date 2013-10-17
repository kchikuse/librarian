app.directive('digits', function () {    
    return {
        link: function (scope, element) {            
            element.bind('keydown', function (e) { 
                var key = e.keyCode;
                if (_.contains([ 8, 9, 13, 27, 46 ], key)) return;                
                else {
                    if (e.shiftKey || (key < 48 || key > 57) && (key < 96 || key > 105)) {
                        e.preventDefault();
                    }
                }
            }); 
        } 
    }
});

app.directive('cover', ['config', function (config) {
    return {
        link: function (scope, element, attr) {            
            scope.$on('book-load', function(e, book) {            
                element.attr('src', config.covers + book.Thumbnail);
            });    
        } 
    };
}]);

app.directive('init', ['$timeout', function ($timeout) {
    return {
        link: function (scope) {
            scope.$on('books-load', function () {
                $timeout(init, 0, false);
            });

            scope.$on('$routeChangeSuccess', function(next, current) { 
               var scr = app.scroller;
               if(!scr) return;

               if(current.params.id) { 
                    scr.disable();    
                    scr.refresh();  
               } else scr.enable(); 
            });
        }
    };
}]);

app.directive('rating', function () {
    return function (scope, element) {
        scope.$on('book-load', function(e, book) {
           element.raty({
                number: 5,
                readOnly: true,
                score: book.Rating,
                path: 'assets/raty',
                hints: ['','','','']                
            });
        });
    };
});

app.directive('markdown', function () {
    return function (scope, element) {
        scope.$on('book-load', function(e, book) {           
           element.html( converter.makeHtml( element.text() ) );
        });
    };
});

app.directive('browse', ['nav', function (nav) {
    return {
        link: function (scope, element) {            
            scope.$on('book-load', function(e, book) { 
                element.focus().bind('keydown', function (e) {                                                       
                    switch (e.keyCode || e.which) {
                        case 37:
                        nav.redirect(book.Id, 'L');
                        break;

                        case 39:
                        nav.redirect(book.Id, 'R');
                        break;

                        case 27:
                        case 36:
                        nav.redirect(book.Id);
                        break;
                    }
                });

                var el = $(element).hammer();

                el.on('swipeleft', function() {
                    nav.redirect(book.Id, 'R');
                });

                el.on('swiperight', function() {
                    nav.redirect(book.Id, 'L')
                });
            });    
        },    
    };
}]);

app.directive('drop', ['http', 'config', function (http, config) {

    return function (scope, element) {
        element.on('drop', function (e) {
            
            e.originalEvent.stopPropagation();
            e.originalEvent.preventDefault();

            var files = e.originalEvent.dataTransfer.files;

            if (!files.length) {
                return;
            }

            if (FormData === undefined) {
                return error("only works with chrome");
            }

            var data = new FormData();

            data.append('file', files[0]);

            if (!validCover(files[0].name)) {
                return error('only an image can be used as a book cover');
            }

            http.post('api/cover', data, function(file){
                if(file === 'false') {
                    error('failed to save book cover');
                }
                else {
                    file = file.replace(/"/g, "");
                    scope.book.Thumbnail = file;   
                    element.attr('src', config.covers + file);
                    scope.$apply();
                }
            }).always(function() {
                element.removeClass('over');
            });

        }).on('dragover', function (e) {
            e.preventDefault();
        }).on('dragenter', function () {
            element.addClass('over');
        }).on('dragleave mouseleave', function() {
            element.removeClass('over');
        });
    };
}]);

app.directive('submit', ['http', 'nav', function (http, nav) {
    return function (scope, element) {
       scope.$on('book-load', function(e, book) {            
            var create = book.Id === 0;
            element.text(create ? 'Save' : 'Update');
            element.bind('click', function() {
                http.put('api/update', scope.book, function(result){
                    if(result === 'false') {
                        error('failed to save the changes');
                    }
                    else {
                        notify('book saved successfully');                
                        if(create) {
                            nav.redirect(result);
                        }
                    }
                });
            });
        });       
    };
}]);

app.directive('google', ['http', function (http) {
    return function (scope, element) {        
        element.bind('click', function() {
            var isbn = scope.book.ISBN;
            
            if(!isbn.length) {
                $('.isbn').focus();
                return error('enter an ISBN to search for');
            }
            
            http.get('api/google/' + isbn, function(book) {                                
                if(book.Thumbnail) {
                    $('.bookcover').attr('src', book.Thumbnail);
                }
                angular.copy(book, scope.book);
                scope.$apply();               
            }, true);
        });     
    };
}]);
