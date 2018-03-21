myApp.controller('SoldierController', ['SoldierService', 'UserService', function(SoldierService, UserService) {
  console.log('SoldierController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
}]);