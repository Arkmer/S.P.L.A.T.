myApp.service('UserService', ['$http', '$location', function($http, $location){
  // console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.unitObject = {list: []};
  self.leaders = {list: []};
  self.unitChange = {};
  self.unitNameThings = 0;
  self.currentUnit = {list: []};

  self.getuser = function(){
    // console.log('UserService -- getuser');
    $http.get('/api/user').then(function(response) {
        if(response.data) {
            // user has a curret session on the server
            self.userObject = response.data
            console.log('UserService -- getuser -- User Data: ', self.userObject);
            self.getUnits();
        } else {
            // console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      // console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = function() {
    // console.log('UserService -- logout');
    $http.get('/api/user/logout').then(function(response) {
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
    $http({
      method: 'GET',
      url: `/api/user/units`
    }).then(function(response){
      self.unitObject.list = response.data;
      self.getLeadership(self.userObject.unit_id);
    }).catch(function (error) {
      // console.log('SoldierService.getSoldierRoster', error);
    })
  }

  self.getLeadership = function(unit_id){
    $http({
      method: 'GET',
      url: `/api/user/leaders/${unit_id}`
    }).then(function(response){
      self.leaders.list = response.data;
      console.log(self.leaders.list);
    }).catch(function (error) {
      // console.log('SoldierService.getSoldierRoster', error);
    })
  }

  self.submitUnitChange = function(){
    let update = {};
    update.unit_id = self.unitChange.unit_id;
    update.id = self.userObject.id;
    $http({
      method: 'PUT',
      url: `/api/user/leader/transfer`,
      data: update
    }).then(function(response){
      self.getuser();
    }).catch(function (error) {
      // console.log('SoldierService.getSoldierRoster', error);
    })
  }

  self.unitName = function(){
    self.unitNameThings = self.userObject.unit_id - 1;
    self.currentUnit.list = self.unitObject.list[self.unitNameThings].unit;
    console.log('self.currentUnit', self.currentUnit);
  }
}]);
