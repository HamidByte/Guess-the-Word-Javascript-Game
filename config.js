requirejs.config({
    baseUrl: 'js',
    paths: {
        'jquery': ['vendor/jquery-3.6.0.min'],
        "popper": "vendor/popper.min",
        "bootstrap": "vendor/bootstrap/bootstrap.min",
        "initBootstrap": "",
        'fontawesome': 'vendor/fontawesome/fontawesome.min',
        'fontawesome/solid': 'vendor/fontawesome/solid.min',
        'fontawesome/brands': 'vendor/fontawesome/brands.min',
        'fetch': ['fetch'],
        'methods': ['methods'],
        'testData': ['testData'],
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
