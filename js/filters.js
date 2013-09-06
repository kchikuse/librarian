app.filter('range', function () {
    return function (input, min, max) {
        return _.range(min, max);
    };
});