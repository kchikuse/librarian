app.factory('nav', function () {
    var store = window.localStorage;   

    return {
        saveBooks: function (books) {
            if(!store.getItem('books')) {
                var ids = _.pluck(books, 'Id');
                store.setItem('books', ids);
            }
        },
        redirect: function(id, direction) {
            var books =  store.getItem('books'),
                list = books.split(','),        
                index = list.indexOf(id.toString());

            if(!direction) {               
               location.hash = '#/' + id;
            }

            if(direction === 'L') {            
                var previd = index > 0 ? list[index - 1] : _.last(list);                                   
                location.hash = '#/' + previd;
            }

            if(direction === 'R') {             
                var nextid = index < list.length - 1 ? list[index + 1] : _.first(list);
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

       get: function(url, callback, loading) {
        return $.ajax({           
            url: url,  
            type: 'GET',     
            dataType: 'json',        
            success: callback,
            complete: function() {
                load(false);
            },
            beforeSend: function() {
                if(loading) load();
            }
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