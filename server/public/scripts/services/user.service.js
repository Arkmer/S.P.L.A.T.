myApp.service('UserService', ['$http', '$location', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.unitObject = {list: []};

  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/api/user').then(function(response) {
        if(response.data) {
            // user has a curret session on the server
            self.userObject = response.data
            console.log('UserService -- getuser -- User Data: ', self.userObject);
            self.getUnits();
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/api/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
      self.userObject = {
            username: '',
            password: '',
            first: '',
            last: '',
            rank: '',
            unit: '',
          };
      self.unitObject = {list: []};
    });
  }

  self.getUnits = function(){
    console.log('getUnits');
    $http({
      method: 'GET',
      url: `/api/user/units`
    }).then(function(response){
      self.unitObject.list = response.data;
      console.log('getUnits', self.unitObject);
    }).catch(function (error) {
      console.log('SoldierService.getSoldierRoster', error);
    })
  }
}]);
