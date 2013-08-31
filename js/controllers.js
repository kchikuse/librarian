function index(context) {
    this.load('api')
        .then(function(items) {
            context.partial('partials/hello.html', {
                books: JSON.parse(items)
            },initScroll);
        });
}

function error() {
    this.partial('partials/404.html');
}

