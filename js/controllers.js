'use strict';

//Development Flag
var D = true;

/* Controllers */

function SplashCtrl($scope, $location) {
    $scope.skip = function() {
        $location.path('/login/');
    };
}

function LoginCtrl($scope, $location) {
    if(D){
        $scope.loginEmail = "cmg301@gmail.com";
        $scope.loginPass = "blkajdf";
    }

    $scope.login = function() {
        $location.path('/menu/');
    };
}

function MenuCtrl($scope, $location) {
    $scope.load = function(newLoc) {
        $location.path('/'+newLoc+'/');
    };
}

function DrawCtrl($scope, $location, DrawingService, animate) {
    $scope.menuOpen = false;
    $scope.sliderText = "+";

    animator(DrawingService, animate);

    $scope.menu = function() {
        $scope.menuOpen = !$scope.menuOpen;
        $scope.sliderText = $scope.menuOpen ? "-" : "+";
    };

    $scope.pencil = function() {
        $scope.pencilOpen = !$scope.pencilOpen;
    };

    $scope.erase = function() {
        $scope.eraseOpen = !$scope.eraseOpen;
    };

    $scope.undo = function() {

    };

    $scope.layer = function() {

    };

    $scope.palette = function() {

    };

    $scope.save = function() {

    };

    $scope.back = function() {
        $location.path('/menu/');
    };
}

function BranchCtrl() {
}


function ReplayCtrl() {
}


function HistCtrl() {
}


function SetCtrl() {
}
//SetCtrl.$inject = [];

