'use strict';


// Declare app level module which depends on filters, and services
angular.module('wcon', ['wcon.filters', 'wcon.services', 'wcon.directives']).
  config(function($routeProvider, $locationProvider) {
	//$locationProvider.html5Mode(true);
	
    $routeProvider.when('/', {templateUrl: 'partials/splash.html', controller: SplashCtrl});
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: LoginCtrl});
	$routeProvider.when('/menu', {templateUrl: 'partials/menu.html', controller: MenuCtrl});
	$routeProvider.when('/month', {templateUrl: 'partials/month.html', controller: DrawCtrl});
	$routeProvider.when('/week', {templateUrl: 'partials/week.html', controller: BranchCtrl});
	$routeProvider.when('/day', {templateUrl: 'partials/day.html', controller: ReplayCtrl});
	$routeProvider.when('/meeting', {templateUrl: 'partials/meeting.html', controller: HistCtrl});
	$routeProvider.when('/meeting/:meetId', {templateUrl: 'partials/details.html', controller: SetCtrl});
    $routeProvider.otherwise({redirectTo: '/login'});
  });
