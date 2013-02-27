'use strict';


// Declare app level module which depends on filters, and services
angular.module('wcon', ['wcon.filters', 'wcon.services', 'wcon.directives']).
config(function($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);

    $routeProvider.when('/', {templateUrl: 'view/splash.html', controller: SplashCtrl});
    $routeProvider.when('/login', {templateUrl: 'view/login.html', controller: LoginCtrl});
    $routeProvider.when('/home', {templateUrl: 'view/home.html', controller: HomeCtrl});

    $routeProvider.when('/meeting', {templateUrl: 'view/meeting.html', controller: MeetCtrl});
    $routeProvider.when('/meeting/year/:year', {templateUrl: 'view/meeting.html', controller: MeetCtrl});
    $routeProvider.when('/meeting/year/:year/month/:month', {templateUrl: 'view/meeting.html', controller: MeetCtrl});
    $routeProvider.when('/meeting/year/:year/month/:month/day/:day', {templateUrl: 'view/meeting.html', controller: MeetCtrl});
    $routeProvider.when('/meeting/:meetId', {templateUrl: 'view/details.html', controller: DetailCtrl});

    $routeProvider.when('/client', {templateUrl: 'view/client.html', controller: ClientCtrl});
    $routeProvider.when('/client/:clientId', {templateUrl: 'view/client.html', controller: ClientCtrl});
    $routeProvider.when('/data', {templateUrl: 'view/data.html', controller: DataCtrl});
    $routeProvider.when('/settings', {templateUrl: 'view/settings.html', controller: SettingsCtrl});

    $routeProvider.otherwise({redirectTo: '/login'});
});
