requirejs.config({
    baseUrl: '',
    paths: {
        'env': 'globals',
        'jquery': ['js/vendor/jquery-3.6.0.min'],
        "popper": "js/vendor/popper.min",
        "bootstrap": "js/vendor/bootstrap/bootstrap.min",
        "initBootstrap": "",
        'fontawesome': 'js/vendor/fontawesome/fontawesome.min',
        'fontawesome/solid': 'js/vendor/fontawesome/solid.min',
        'fontawesome/brands': 'js/vendor/fontawesome/brands.min',
        'fetch': ['js/fetch'],
        'api': ['js/api'],
        'methods': ['js/methods'],
        'testData': ['js/testData'],
    },
    shim: {
        "bootstrap": {
            deps: ["jquery", "popper"]
        },
        'fontawesome': {
          deps: ['fontawesome/solid', 'fontawesome/brands']
        }
    }
})

// load popper first before initializing bootstrap
define("initBootstrap", ["popper"], function(popper) {
    // Set popper as required by Bootstrap
    window.Popper = popper;
    require(["bootstrap"], function(bootstrap) {
        // Bootstrap initialization
    });
});

// load fontawesome
require(['fontawesome'], function (fontawesome) {
    // FontAwesome initialization
})
