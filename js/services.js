'use strict';

/* Services */
angular.module('wconREST', ['ngResource']).
    factory('User', function($resource) {
      var Client = $resource('https://api.weconvene.com/api/1/'+'users/:id',
          { apiKey: '4f847ad3e4b08a2eed5f3b54' }, {
            update: { method: 'PUT' }
          }
      );
 
      User.prototype.update = function(cb) {
        return User.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
      };
 
      User.prototype.destroy = function(cb) {
        return User.remove({id: this._id.$oid}, cb);
      };
 
      return User;
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
      var Meeting = $resource('https://api.weconvene.com/api/1/meetings/:id',
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
      };
 
      return Meeting;
    });
