myApp.controller('VehicleController', ['VehicleService', 'UserService', function(SoldierService, UserService) {
  console.log('VehicleController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.vehicleService = VehicleService;
}]);