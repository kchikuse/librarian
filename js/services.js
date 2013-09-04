app.factory('navService', function () {
    var books = {};
        store = window.sessionStorage;   

    return {
        saveBooks: function (books) {
            if(!store.getItem('books')) {
                store.setItem('books', _.pluck(books, 'Id'));
            }
        },
        getBooks: function () {
            return store.getItem('books').split(',');
        }
    };
    
});