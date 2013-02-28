'use strict';

/* Services */
angular.module('wcon.services', ['ngResource']).
factory('User', ['$resource', '$http', 
    function($resource, $http) {
        //If we had a backend, this would target the User object
        //var User = $resource('https://api.weconvene.com/api/1/users/:userId',{userId:'@id'});

        //But we don't, so we'll fake it
        var User = {
            id : '-1',
            auth : false,
            imageURL : 'img/me.jpg',
            name : 'Chris Gladd'
        };

        //Provide Accessor / Modifiers
        return {
            logIn : function() {
                User.auth = true;
            },
            logOut : function() {
                User.auth = false;
            },
            getUsers : function() {
                //Backend Only
                //return User.query();
            },
            getUser : function(id) {
                return User;
                //Backend usage
                //return User.get({userId: id});
            },
            getStatus : function() {
                return User.auth;
            }
        }
}]).
factory('Client', ['$resource', '$http',
    function($resource, $http) {
        //Client object obtained from RESTful API
        //var Client = $resource('https://api.weconvene.com/api/1/client/:clientId', {clientId:'@id'});

        var Client = {};
        return Client;
}]).
factory('Meeting', ['$resource', '$http',
    function($resource, $http) {
        //Meeting object obtained from RESTful API
        //var Meeting = $resource('https://api.weconvene.com/api/1/meeting/:meetId', {clientId:'@id'});

        var Meeting = {};
        return Meeting;
}])
.factory('MeetingGen', function() {
    /**
     * Generate some fake meetings for the UI to play with
     * Some of this is rougher since it's just for faking purposes
     */
    return (function(){
        var desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec risus nulla, fringilla at convallis non, adipiscing et libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec risus nulla, fringilla at convallis non, adipiscing et libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec risus nulla, fringilla at convallis non, adipiscing et libero.';

        var Generated = [];

        /**
         * Generate a single meeting
         */
        function generateMeeting(){
            var dates = wcon.utils.getRandomDates();
            var start = dates[0];
            var end = dates[1];
            var name = wcon.utils.getRandomName();
            
            return {
                id : Math.floor(9999999 * Math.random()),
                type : 'meeting',
                title : 'Meeting with ' + name,
                appt : wcon.utils.getDateTimeString(start),
                desc : desc,
                start : start,
                end : end,
                imageURL : 'img/unknown.jpg'
            }
        };

        /**
         * Fake an activity for the home page
         */
        function generateMeetingAct(){
            var meet = generateMeeting();
            var name = wcon.utils.getRandomName() + " Smith";
            var action = wcon.utils.getRandomAction();

            meet.title = 'Meeting with ' + name + ' was ' + action + ' to ' + wcon.utils.getDateTimeString(meet.start);
            return meet;
        };

        /**
         * Expose the following public methods
         */
        return {
            /**
             * Generate a collection of activities
             * num : number of activites to create
             */
            getActivities: function(num) {
                var meetings = [];
                for(var i = 0; i < num; i++){
                    meetings.push(generateMeetingAct());
                }
                Generated = meetings;
                return Generated;
            },
            /**
             * Generate a collection of meetings
             * num : number of meetings to create
             */
            getMeetings: function(num) {
                var meetings = [];
                for(var i = 0; i < num; i++){
                    meetings.push(generateMeeting());
                }
                Generated = meetings;
                return Generated;
            },
            getMeetingsByDate: function(date){
                var meetings = [];
                for(var i = 0; i < Generated.length; i++){
                    var s = Generated[i].start;
                    console.log(date);
                    if((date.getYear() === s.getYear()) &&
                        (date.getMonth() === s.getMonth()) &&
                        (date.getDate() === s.getDate())){
                        meetings.push(Generated[i]);
                    }
                }
                return meetings;
            },
            getMeetingByID: function(id){
                if(Generated.length < 1){
                    this.getMeetings(1);
                }

                var ret = Generated[0];
                for(var i = 0; i < Generated.length; i++){
                    var gid = Generated[i].id;
                    if(gid == id){
                        ret = Generated[i];
                        break;
                    }
                }
                ret = wcon.utils.addMeetingUsers(ret);

                return ret;
            }
        }
    })();
})
.factory('ClientGen', function() {
    /**
     * Generate some fake clients for the UI to play with
     * Some of this is rougher since it's just for faking purposes
     */
    return (function(){
        var desc = 'Client for 2 years.';
        var Generated = [];

        function generateClient(){
            var dates = wcon.utils.getRandomDates();
            var start = dates[0];
            var end = dates[1];

            return {
                id : Math.floor(9999999 * Math.random()),
                name : wcon.utils.getRandomName()+" Smith",
                company: wcon.utils.getRandomCompany(),
                desc : desc,
                start : start,
                end : end,
                imageURL : 'img/unknown.jpg'
            }
        };

        return {
            getClients: function(num) {
                if(Generated.length == num){
                    return Generated;
                }

                var meetings = [];
                for(var i = 0; i < num; i++){
                    meetings.push(generateClient());
                }
                Generated = meetings;

                return Generated;
            },
            getClientByID: function(id){
                if(Generated.length < 1){
                    this.getMeetings(1);
                }

                var ret = Generated[0];
                for(var i = 0; i < Generated.length; i++){
                    var gid = Generated[i].id;
                    console.log(gid + " : " + id);
                    if(gid == id){
                        ret = Generated[i];
                        break;
                    }
                }
                return ret;
            }
        }
    })();
});

// Create a simple namespace
var wcon = wcon || {};
// Create the utils namespace to house some helper functions
wcon.utils = {
    getRandomName : function (){
        var names = ["Bob", "John", "Mary", "Jane"];
        return names[Math.floor(Math.random() * names.length)]
    },

    getRandomCompany : function (){
        var companies = ["WeConvene", "IBM", "Intuitive Controls", "Amazon", "Google"];
        return companies[Math.floor(Math.random() * companies.length)]
    },

    getRandomAction : function () {
        var actions = ["Rescheduled", "Moved", "Changed"];
        return actions[Math.floor(Math.random() * actions.length)]
    },

    getRandomDates : function () {
        var start = new Date();
        var sMilli = start.getTime();

        var add = Math.floor(Math.random() * 900000000);
        var end = Math.floor(Math.random() * 9000000);

        return [new Date(sMilli+add), new Date(sMilli+add+end)];
    },

    getDateTimeString : function (date) {
        var hr = date.getHours();
        if(hr.length < 2){
            hr = "0"+hr;
        }

        var min = date.getMinutes();
        if(min.length < 2){
            min = "0"+hr;
        }

        return date.toLocaleDateString() + ' at ' + hr + ':' + min;
    },

    getUsers : function(num, type){
        var users = [];
        for(var i = 0; i < num; i++){
            users.push({
                type : type,
                id : -1,
                name : wcon.utils.getRandomName() + " Smith",
                imageURL : 'img/unknown.jpg'
            });
        }
        return users;
    },

    addMeetingUsers : function (ret){
        ret.owners = [{
            type : 'user',
            id : -1,
            name : 'Chris Gladd',
            imageURL : 'img/me.jpg'
        }];
        ret.colleagues = wcon.utils.getUsers(2,'user');
        ret.clients = wcon.utils.getUsers(2,'client');
        return ret;
    }
}
