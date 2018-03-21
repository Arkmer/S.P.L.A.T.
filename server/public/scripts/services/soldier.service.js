myApp.service('SoldierService', ['$http', '$location', function($http, $location){
    console.log('SoldierService Loaded');
    var self = this;
    // self.userObject = {};
    // self.unitObject = []; // build a get to fill this
  
    // self.getuser = function(){
    //   console.log('SoldierService -- getuser');
    //   $http.get('/api/user').then(function(response) {
    //       if(response.data) {
    //           // user has a curret session on the server
    //           self.userObject = response.data
    //           console.log('SoldierService -- getuser -- User Data: ', self.userObject);
    //       } else {
    //           console.log('SoldierService -- getuser -- failure');
    //           // user has no session, bounce them back to the login page
    //           $location.path("/home");
    //       }
    //   },function(response){
    //     console.log('SoldierService -- getuser -- failure: ', response);
    //     $location.path("/home");
    //   });
    // },
  
    // self.logout = function() {
    //   console.log('SoldierService -- logout');
    //   $http.get('/api/user/logout').then(function(response) {
    //     console.log('SoldierService -- logout -- logged out');
    //     $location.path("/home");
    //   });
    // }
  
    // self.getUnits = function(){
    //   console.log('getUnits');
    //   $http.get()
    // }

  }]);
  