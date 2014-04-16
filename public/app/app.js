angular.module('app', ['ngResource', 'ngRoute', 'restangular']);

angular.module('app').config(function($routeProvider, $locationProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('/api');

    var routeRoleChecks = {
        admin: { auth: function (mvAuth) {
            return mvAuth.authoriseCurrentUserForRoute('admin');
        }},
        user: { auth: function (mvAuth) {
            return mvAuth.authoriseAuthenticatedUserForRoute();
        }}
    };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl', resolve: routeRoleChecks.user })
        .when('/login', { templateUrl: '/partials/account/login', controller: 'mvLoginCtrl' });
});

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/login');
        }
    });
});