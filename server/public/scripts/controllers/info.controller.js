myApp.controller('InfoController', ['UserService', function(UserService) {
  // console.log('InfoController created');
  var self = this;
  self.userService = UserService;
  self.unitObject = UserService.unitObject;
  self.userObject = UserService.userObject;
  self.getUnits = UserService.getUnits;
  self.getuser = UserService.getuser;
  self.leaders = UserService.leaders;
  self.unitChange = UserService.unitChange;
  self.submitUnitChange = UserService.submitUnitChange;
  self.currentUnit = UserService.currentUnit;
  
  self.getuser();

  self.toggleEdit = function(leader){
    self.showEdit = !self.showEdit
  }

  
}]);
