app.factory('nav', function () {
    var store = window.sessionStorage;   

    return {
        saveBooks: function (books) {
            if(!store.getItem('books')) {
                store.setItem('books', _.pluck(books, 'Id'));
            }
        },
        redirect: function(id, direction) {
            var list = store.getItem('books').split(','),        
                idx = list.indexOf(id.toString());

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


app.factory('http', function () {
    return {

      put: function(url, data, callback) {
        return $.ajax({            
            url: url,
            data: data, 
            type: 'PUT',             
            success: callback
        }); 
      },

       get: function(url, callback) {
        return $.ajax({           
            url: url,  
            type: 'GET',     
            dataType: 'json',        
            success: callback
        });     
       },

      post: function(url, data, callback) {
       return $.ajax({            
            url: url,
            data: data, 
            type: 'POST',             
            success: callback,
            contentType: false,
            processData: false
        });  
      },

    };
});