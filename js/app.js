'use strict';


// Declare app level module which depends on filters, and services
angular.module('wcon', ['wcon.filters', 'wcon.services', 'wcon.directives']).
config(function($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);

    $routeProvider.when('/', {templateUrl: 'view/splash.html', controller: SplashCtrl});
    $routeProvider.when('/login', {templateUrl: 'view/login.html', controller: LoginCtrl});
    $routeProvider.when('/home', {templateUrl: 'view/home.html', controller: HomeCtrl});

    $routeProvider.when('/meeting', {templateUrl: 'view/meeting.html', controller: MeetCtrl});
    $routeProvider.when('/meeting/:meetId', {templateUrl: 'view/details.html', controller: DetailCtrl});

    $routeProvider.when('/client', {templateUrl: 'view/client.html', controller: ClientCtrl});
    $routeProvider.when('/client/:clientId', {templateUrl: 'view/client.html', controller: ClientCtrl});

    $routeProvider.when('/about', {templateUrl: 'view/about.html', controller: AboutCtrl});

    $routeProvider.otherwise({redirectTo: '/login'});
});
