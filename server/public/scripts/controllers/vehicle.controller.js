myApp.controller('VehicleController', ['VehicleService', 'UserService', function(VehicleService, UserService) {
  // console.log('VehicleController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.vehicleService = VehicleService;
  self.clearInputs = VehicleService.clearInputs;
  self.newVehicleInfo = VehicleService.newVehicleInfo;
  self.submitVehicle = VehicleService.submitVehicle;
  self.getVehicleRoster = VehicleService.getVehicleRoster;
  self.vehicleRoster = VehicleService.vehicleRoster;
  self.addVehicleDoc = VehicleService.addVehicleDoc;
  self.removeVehicle = VehicleService.removeVehicle;
  self.removeDoc = VehicleService.removeDoc;

  self.getVehicleRoster(self.userObject.unit_id);

  self.toggleNewVehicle = function(){
    self.inputsShowHide = !self.inputsShowHide;
  }

  self.editVehicleInputs = function(vehicle){
    vehicle.inputsShowHide = !vehicle.inputsShowHide;
  }

  self.toggleVehicleDocs = function(vehicle){
    vehicle.showSubtable = !vehicle.showSubtable;
  }

  self.submitVehicleController = function(){
    let completeNewVehicle = self.newVehicleInfo;
    completeNewVehicle.unit = self.userObject.unit_id;
    self.submitVehicle(completeNewVehicle);
  }
}]);