'use strict';


// Declare app level module which depends on filters, and services
angular.module('wcon', ['wcon.filters', 'wcon.services', 'wcon.directives'])
.config(function($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);

    $routeProvider.when('/', 
        {templateUrl: 'view/splash.html', controller: SplashCtrl});

    $routeProvider.when('/login', 
        {templateUrl: 'view/login.html', controller: LoginCtrl});

    $routeProvider.when('/home', 
        {templateUrl: 'view/home.html', controller: HomeCtrl});

    $routeProvider.when('/meeting', 
        {templateUrl: 'view/meeting.html', controller: MeetCtrl});

    $routeProvider.when('/meeting/:meetId', 
        {templateUrl: 'view/details.html', controller: DetailCtrl});

    $routeProvider.when('/client', 
        {templateUrl: 'view/client.html', controller: ClientCtrl});

    $routeProvider.when('/client/:clientId', 
        {templateUrl: 'view/client.html', controller: ClientCtrl});

    $routeProvider.when('/about', 
        {templateUrl: 'view/about.html', controller: AboutCtrl});

    $routeProvider.otherwise({redirectTo: '/home'});
})
/**
 * If the user isn't authenticated and tries to access the API
 * this intercepter will broadcast the loginRequired event to ask for login
 */
.config(function($httpProvider) {
    var interceptor = ['$rootScope','$q', function(scope, $q) {
        function success(response) {
            return response;
        }

        function error(response) {
            var status = response.status;

            //Not Authenticated
            if (status == 401) {
                //Save the request configuration and deferred
                //For now, we're not cacheing requests but in a
                //real application we can retry the request on
                //successful authentication then return the user 
                //to the correct view they were trying to access.

                /*var deferred = $q.defer();
                var req = {
                    config: response.config,
                    deferred: deferred
                }
                scope.requests401.push(req);*/

                scope.$broadcast('event:loginRequired');
                //If we're retrying, we keep the promise
                //return deferred.promise;
            }
            // otherwise
            return $q.reject(response);

        }

        return function(promise) {
            return promise.then(success, error);
        }
    }];
    $httpProvider.responseInterceptors.push(interceptor);
});
