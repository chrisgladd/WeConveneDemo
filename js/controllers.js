'use strict';

//Development Flag
var D = true;
//var D = false;

/* Controllers */

/**
 * Top Level Functionality
 * User Menu, Logo
 */
function TopCtrl($scope, $rootScope, $location, User) {
    $scope.user = User.getUser();
    $scope.loggedIn = User.getStatus();
    $scope.showMenu = false;

    /**
     * Click Event Handlers
     */
    $scope.toggleMenu = function() {
        $scope.showMenu = !$scope.showMenu;
    };

    $scope.home = function() {
        $location.path('/home/');
    };

    $scope.settings = function() {
        $location.path('/settings/');
    };

    $scope.logout = function() {
        $rootScope.$broadcast('event:loggedOut');
    };

    /**
     * Login Event Handlers
     */
    $scope.$on('event:loggedIn', function() {
        $scope.loggedIn = User.getStatus();
    });

    $scope.$on('event:loggedOut', function() {
        User.logOut();
        $scope.loggedIn = User.getStatus();
        $location.path('/login/');
    });

    if(D){
        User.logIn();
        $scope.loggedIn = User.getStatus();
    }
}

/**
 * Controller for Splash Animation
 */
function SplashCtrl($scope, $location, $timeout, $log) {
    $scope.doAnim = false;

    $scope.animate = function() {
        $scope.doAnim = true;
        animTimeout = $timeout( $scope.skip, 2500 );
    };

    $scope.skip = function() {
        $timeout.cancel(animTimeout);
        $location.path('/login/');
    };

    var animTimeout = $timeout( $scope.animate, 150 );
}

/**
 * Login Controller
 * Starts Authentication with the Server
 * Broadcasts event:loggedIn if successful
 */
function LoginCtrl($scope, $location, User, $rootScope) {
    if(D){
        $scope.loginEmail = "cmg301@gmail.com";
        $scope.loginPass = "blkajdf";
    }

    $scope.login = function() {
        User.logIn();
        $rootScope.$broadcast('event:loggedIn');
        $location.path('/home/');
    };
}

/**
 * Home Controller
 */
function HomeCtrl($scope, $location, Activity) {
    $scope.activities = MeetingGen.getActivities(5);
}

/**
 * Meeting Controller
 */
function MeetCtrl($scope, Meeting) {
    $scope.meetings = MeetingGen.getMeetings(10);
    $scope.daysofweek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    $scope.getMonth = function(date) {
        var current = new Date();

        var month = date.getMonth();
        var dow = date.getDay();

        date.setDate((-1 * dow)-1);
        var start = new Date();
        start.setDate(date.getDate() - dow);

        var days = [];
        for(var i = 0; i < 35; i++){
           days.push({
               number: start.getDate(),
               meetings : MeetingGen.getMeetingsByDate(start)
           });
           start.setDate(start.getDate() + 1);
        }

        return days;
    };

    $scope.days = $scope.getMonth(new Date());
}

/**
 * Meeting Detail Controller
 */
function DetailCtrl($scope, $routeParams, Meeting) {
    $scope.meeting = MeetingGen.getMeetingByID($routeParams.meetId);
    
    $scope.id = $scope.meeting.id;
    $scope.title = $scope.meeting.title;
    $scope.desc = $scope.meeting.desc;

    $scope.save = function() {
        //Show Saved text next to buttons
    }

    $scope.cancel = function() {
        //Return to Meetings
        window.history.back();
    }
}

/**
 * Client List and Detail Controller
 */
function ClientCtrl($scope, $routeParams, Client) {
    $scope.detailMode = false;

    if(!$scope.clients){
        $scope.detailMode = false;
        $scope.clients = ClientGen.getClients(10);
        $scope.clientTitle = "";
    }
    if($routeParams.clientId){
        $scope.detailMode = true;
        $scope.client = ClientGen.getClientByID($routeParams.clientId);
        $scope.clientTitle = "- " + $scope.client.name;
    }

    $scope.save = function() {
        //Show Saved text next to buttons
    }

    $scope.cancel = function() {
        //Return to Meetings
        window.history.back();
    }
}

/**
 * Data Controller
 */
function DataCtrl($scope, Data) {
}


/** 
 * Settings Controller
 */
function SettingsCtrl($scope){

}
//SetCtrl.$inject = [];
