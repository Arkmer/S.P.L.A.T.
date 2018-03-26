myApp.controller('VehicleController', ['VehicleService', 'UserService', function(VehicleService, UserService) {
  console.log('VehicleController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.vehicleService = VehicleService;
}]);