myApp.controller('InfoController', ['UserService', function(UserService) {
  // console.log('InfoController created');
  var self = this;
  self.userService = UserService;
  self.unitObject = UserService.unitObject;
  self.getUnits = UserService.getUnits;
  self.getuser = UserService.getuser;
  
  self.getuser();
}]);
