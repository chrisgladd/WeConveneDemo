'use strict';

/* Services */
angular.module('wcon.services', ['ngResource']).
factory('User', function($resource) {
    //User object obtained from RESTful API
    /* var User = $resource('https://api.weconvene.com/api/1/'+'users/:id',
        { apiKey: '4f847ad3e4b08a2eed5f3b54' },
        { update: { method: 'PUT' } });
    User.prototype.update = function(cb) {
        return User.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
    };

    User.prototype.destroy = function(cb) {
        return User.remove({id: this._id.$oid}, cb);
    }; */

    var User = {
        id : '-1',
        auth : false,
        imageURL : 'img/me.jpg',
        name : 'Chris Gladd'
    };

    return {
        logIn : function() {
            User.auth = true;
        },
        logOut : function() {
            User.auth = false;
        },
        getUser : function() {
            return User;
        },
        getID : function() {
            return User.id;
        },
        getStatus : function() {
            return User.auth;
        },
        getImageURL : function() {
            return User.imageURL;
        },
        getName : function() {
            return User.name;
        }
    }
}).
factory('Client', function($resource) {
    var Client = $resource('https://api.weconvene.com/api/1/'+'clients/:id',
        { apiKey: '4f847ad3e4b08a2eed5f3b54' }, {
                                                    update: { method: 'PUT' }
                                                }
        );

    Client.prototype.update = function(cb) {
        return Client.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
    };

    Client.prototype.destroy = function(cb) {
        return Client.remove({id: this._id.$oid}, cb);
    };

    return Client;
}).
factory('Meeting', function($resource) {
    /* var Meeting = $resource('https://api.weconvene.com/api/1/meetings/:id',
        { apiKey: '4f847ad3e4b08a2eed5f3b54' }, {
                                                    update: { method: 'PUT' }
                                                }
        );

    Meeting.prototype.update = function(cb) {
        return Meeting.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
    };

    Meeting.prototype.destroy = function(cb) {
        return Meeting.remove({id: this._id.$oid}, cb);
    }; */

    var Meeting = {
        id : -1,
        title : 'Title',
        desc : 'Long Description',
        start : new Date(),
        end : new Date()
    };

    return {
        getTitle: function() {
            return Meeting.title;
        },
        getDesc: function() {
            return Meeting.desc;
        },
        getStart: function() {
            return Meeting.start;
        },
        getStartString: function() {
            return Meeting.start.toString();
        },
        getEnd: function() {
            return Meeting.start;
        },
        getEndString: function() {
            return Meeting.start.toString();
        },
    };
})
.factory('Activity', function($resource) {

    var Activity = {
        id : -1,
        title : 'Meeting with Bob',
        desc : '',
        start : new Date(),
        end : new Date()
    };

    Activity.end.setHours(Activity.end.getHours()+2);

    return {
        getTitle: function() {
            return Activity.title;
        },
        getDesc: function() {
            return Activity.desc;
        },
        getStart: function() {
            return Activity.start;
        },
        getStartString: function() {
            return Activity.start.toLocaleString();
        },
        getEnd: function() {
            return Activity.start;
        },
        getEndString: function() {
            return Activity.start.toLocaleString();
        },
    };
});

var MeetingGen = (function(){
    var names = ["Bob", "John", "Mary", "Jane"];
    var actions = ["Rescheduled", "Moved", "Changed"];
    var desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec risus nulla, fringilla at convallis non, adipiscing et libero. Duis sodales iaculis lacinia. Integer sodales ullamcorper ipsum et molestie. Etiam ipsum urna, pellentesque ac pharetra eu, sagittis at sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque at adipiscing nibh. Suspendisse tempus aliquam mauris vitae gravida. Maecenas erat mi, bibendum non hendrerit in, venenatis vitae nibh. Pellentesque in diam sed dui vulputate varius nec lobortis felis. Phasellus auctor justo in purus adipiscing in rutrum lectus dictum. Integer magna urna, aliquam id varius at, venenatis sed felis. Vivamus euismod vestibulum odio, et tincidunt sapien venenatis sed.';

    var Generated = [];

    function generateMeeting(){
        var start = new Date();
        var sMilli = start.getTime();

        var add = Math.floor(Math.random() * 900000000);
        var end = Math.floor(Math.random() * 9000000);

        start = new Date(sMilli+add);
        var end = new Date(sMilli+add+end);

        var name = Math.floor(Math.random() * 3);
        
        return {
            id : Math.floor(9999999 * Math.random()),
            type : 'meeting',
            title : 'Meeting with ' + names[name],
            appt : getDateTimeString(start),
            desc : desc,
            start : start,
            end : end,
            imageURL : 'img/unknown.jpg'
        }
    };

    function generateMeetingAct(){
        var meet = generateMeeting();
        var name = Math.floor(Math.random() * 3);
        var action = Math.floor(Math.random() * 3);

        meet.title = 'Meeting with ' + names[name] + ' was ' + actions[action] + ' to ' + getDateTimeString(meet.start);
        return meet;
    };

    return {
        getActivities: function(num) {
            var meetings = [];
            for(var i = 0; i < num; i++){
                meetings.push(generateMeetingAct());
            }
            Generated = meetings;
            return Generated;
        },
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
                console.log(gid + " : " + id);
                if(gid == id){
                    ret = Generated[i];
                    break;
                }
            }
            ret.owners = [{
                type : 'user',
                id : -1,
                name : 'Chris Gladd',
                imageURL : 'img/me.jpg'
            }];
            ret.colleagues = [{
                type : 'user',
                id : -1,
                name : 'John Smith',
                imageURL : 'img/unknown.jpg'
            },
            {
                type : 'user',
                id : -1,
                name : 'Jane Doe',
                imageURL : 'img/unknown.jpg'
            }];
            ret.clients = [{
                type : 'user',
                id : -1,
                name : 'Joe Nobody',
                imageURL : 'img/unknown.jpg'
            },
            {
                type : 'user',
                id : -1,
                name : 'Bob Smith',
                imageURL : 'img/unknown.jpg'
            }];
            return ret;
        }
    }
})();

var ClientGen = (function(){
    var names = ["Bob", "John", "Mary", "Jane"];
    var companies = ["WeConvene", "IBM", "Intuitive Controls", "Amazon", "Google"];
    var desc = 'Client for 2 years.';

    var Generated = [];

    function generateClient(){
        var start = new Date();
        var sMilli = start.getTime();

        var add = Math.floor(Math.random() * 900000000);
        var end = Math.floor(Math.random() * 9000000);

        start = new Date(sMilli+add);
        var end = new Date(sMilli+add+end);

        var name = Math.floor(Math.random() * 3);
        var com = Math.floor(Math.random() * 4);
        
        return {
            id : Math.floor(9999999 * Math.random()),
            name : names[name]+" Smith",
            company: companies[com],
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

function getDateTimeString(date) {
    var hr = date.getHours();
    if(hr.length < 2){
        hr = "0"+hr;
    }

    var min = date.getMinutes();
    if(min.length < 2){
        min = "0"+hr;
    }

    return date.toLocaleDateString() + ' at ' + hr + ':' + min;
};
