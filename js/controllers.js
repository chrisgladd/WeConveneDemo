'use strict';

//Development Flag
var D = true;


/**
 * Menu Controller Functionality
 * User Menu, Logo
 */
function MenuCtrl($scope, $rootScope, $location, User) {
    $scope.user = User.getUser();
    $scope.loggedIn = User.getStatus();
    $scope.showMenu = false;

    /**
     * Click Event Handlers
     */
    $scope.toggleMenu = function() {
        $scope.showMenu = !$scope.showMenu;
    };

    $scope.nav = function(page) {
        $location.path('/'+page+'/');
    };

    $scope.back = function() {
        window.history.back();
    };

    $scope.logout = function() {
        User.logOut();
        $rootScope.$broadcast('event:loggedOut');
    };

    /**
     * Login Event Handlers
     */
    $scope.$on('event:loggedIn', function() {
        $scope.loggedIn = User.getStatus();
    });

    $scope.$on('event:loggedOut', function() {
        $scope.loggedIn = User.getStatus();
        $location.path('/login/');
    });

    $scope.$on('event:loginRequired', function() {
        User.logOut();
        $scope.loggedIn = false;
        $location.path('/login/');
    });

    $scope.$on('event:noUser', function() {
        $scope.loggedIn = false;
    });

    if(D){
        //User.logIn();
        $scope.loggedIn = User.getStatus();
    }
}
/**
 * Protects the AngularJS injection process when the js code
 * is run through a minifier, makes sure injection is not destroyed
 */
MenuCtrl.$inject = ['$scope', '$rootScope', '$location', 'User'];

/**
 * Controller for Splash Animation
 */
function SplashCtrl($scope, $location, $timeout) {
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
SplashCtrl.$inject = ['$scope', '$location', '$timeout'];

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
        //Backend Authentication
        /* $http.post('auth/login').success(function() {
            User.logIn();
        }); */
        User.logIn();

        $rootScope.$broadcast('event:loggedIn');
        $location.path('/home/');
    };

    $rootScope.$broadcast('event:noUser');
}
LoginCtrl.$inject = ['$scope', '$location', 'User', '$rootScope'];

/**
 * Home Controller
 */
function HomeCtrl($scope, MeetingGen) {
    //A collection of recent activities
    //With a backend API, should be able to pull the
    //most recent activites relavent to the user from
    //an activity log or something similar.
    $scope.activities = MeetingGen.getActivities(5);
}
HomeCtrl.$inject = ['$scope', 'MeetingGen'];

/**
 * Meeting Controller
 */
function MeetCtrl($scope, Meeting, MeetingGen) {
    //If we had a backend, this would GET the collection of meetings
    //$scope.meetings = Meeting.query();
    
    //But, we don't, so we'll fake it for now
    $scope.meetings = MeetingGen.getMeetings(10);

    $scope.daysofweek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    $scope.getMonth = function(date) {
        var current = new Date();

        var month = date.getMonth();
        var dow = date.getDay();

        //Start the calendar at the current week
        date.setDate((-1 * dow)-1);
        var start = new Date();
        start.setDate(date.getDate() - dow);

        //Add the days and meetings to the calendar model
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
MeetCtrl.$inject = ['$scope', 'Meeting', 'MeetingGen'];

/**
 * Meeting Detail Controller
 */
function DetailCtrl($scope, $routeParams, Meeting, MeetingGen) {
    //Here we would GET a specific meeting from the API
    //$scope.meeting = Meeting.get({meetId: $routeParams.meetId});
    $scope.meeting = MeetingGen.getMeetingByID($routeParams.meetId);
    
    $scope.id = $scope.meeting.id;
    $scope.title = $scope.meeting.title;
    $scope.desc = $scope.meeting.desc;

    $scope.save = function() {
        //Show Saved text next to buttons
        window.history.back();
    }

    $scope.cancel = function() {
        //Return to Meetings
        window.history.back();
    }
}
DetailCtrl.$inject = ['$scope', '$routeParams', 'Meeting', 'MeetingGen'];

/**
 * Client List and Detail Controller
 */
function ClientCtrl($scope, $routeParams, Client, ClientGen) {
    //Flag for mobile to hide ClientList
    $scope.detailMode = false;

    //If we don't have any clients populated, fetch some
    if(!$scope.clients){
        $scope.detailMode = false;
        $scope.clients = ClientGen.getClients(10);
        $scope.clientTitle = "";
    }

    //If a client has been chosen, populate the form
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
ClientCtrl.$inject = ['$scope', '$routeParams', 'Client', 'ClientGen'];

/** 
 * About Controller
 */
function AboutCtrl($scope){
    $scope.list = [
        { name: "Author", value: "Chris Gladd" },
        { name: "OS", value: "Ubuntu with Cinnamon" },
        { name: "Editor", value: "gVim" },
        { name: "Browser", value: "Chrome" },
        { name: "Framework", value: "AngularJS 1.0.3" },
        { name: "CSS", value: "Sass using Compass" },
        { name: "Tested On", value: "Chrome (Desktop, iPhone), Safari (iPad, iPhone)" }
    ];
}
AboutCtrl.$inject = ['$scope'];
