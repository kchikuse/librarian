app.factory('navService', function () {
    var store = window.sessionStorage;   

    return {
        saveBooks: function (books) {
            if(!store.getItem('books')) {
                store.setItem('books', _.pluck(books, 'Id'));
            }
        },
        nav: function(id, direction) {
            var list = store.getItem('books').split(','),        
                idx = list.indexOf(id);

            if(!direction) {
               location.hash = '#/';
            }

            if(direction === 'L') {            
                var previd = idx > 0 ? list[idx - 1] : _.last(list);                                        
                location.hash = '#/' + previd;
            }

            if(direction === 'R') {             
                var nextid = idx < list.length - 1 ? list[idx + 1] : _.first(list);
                location.hash = '#/' + nextid;                    
            }
        }   
    };
    
});