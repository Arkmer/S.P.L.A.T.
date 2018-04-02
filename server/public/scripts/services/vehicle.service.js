myApp.service('VehicleService', ['$http', '$location', function($http, $location){
  // console.log('VehicleService Loaded');
  var self = this;
  self.client = filestack.init('AmHeCOZrDRRabvKB4OtaUz');
  self.newVehicleInfo = {};
  self.userUnit = 0;
  self.documents = [];
  self.newDocument = {};
  self.vehicleRoster = {list: []};

  self.clearInputs = function(){
    self.newVehicleInfo.vehicle_model = '';
    self.newVehicleInfo.bumper = '';
    self.newVehicleInfo.status = '';
    self.newVehicleInfo.location = '';
  }

  self.submitVehicle = function(send){
    $http({
      method: 'POST',
      url: '/vehicle',
      data: send
    }).then((res)=>{
      self.getVehicleRoster(send.unit);
      self.newVehicleInfo = {};
    }).catch((error)=>{
      console.log('submitVehicle', error)
    })
  }

  self.getVehicleRoster = function(unit){
    $http({
      method: 'GET',
      url: `/vehicle/${unit}`
    }).then(function(response){
      self.vehicleRoster.list = response.data;
      self.userUnit = unit;
      for(vehicle in self.vehicleRoster.list){
        self.vehicleDocs(vehicle).then();
      }
    }).catch(function (error) {
      console.log('getVehicleRoster', error);
    })
  }

  self.vehicleDocs = function(temp){
    return $http({
      method: 'GET',
      url: `/vehicle/docs/${self.vehicleRoster.list[temp].id}`
    }).then((res)=>{
      self.vehicleRoster.list[temp].docs = res.data;
    }).catch((err)=>{
      console.log('vehicleDocs', err);
    })
  }

  self.addVehicleDoc = function(vehicle){
    self.client.pick({
      accept: '.pdf',
      maxFiles: 1
    }).then(function(result){
      swal("Document Uploaded", "", "success");
      self.newDocument = result.filesUploaded[0];
      self.newDocument.vehicle_id = vehicle.id;
      self.addVehicleDoc1(self.newDocument, vehicle);
    })
  }

  self.addVehicleDoc1 = function(postObj, vehicle){
    $http({
      method: 'POST',
      url: '/vehicle/doc',
      data: postObj
    }).then((res)=>{
      self.newDocument.doc_id = res.data[0].id;
      self.addVehicleDoc2(self.newDocument, vehicle);
    }).catch((error)=>{
      console.log('addVehicleDoc1', error)
    })
  }

  self.addVehicleDoc2 = function(postObj, vehicle){
    $http({
      method: 'POST',
      url: '/vehicle/doc/join',
      data: postObj
    }).then((res)=>{
      self.getVehicleRoster(vehicle.unit_id);
      self.newDocument = {};
    }).catch((error)=>{
      console.log('addVehicleDoc2', error);
    })
  }

  self.removeVehicle = function(vehicle){
    let removeId = vehicle.id;
    $http({
      method: 'DELETE',
      url: `/vehicle/${removeId}`
    }).then(function(response){
      self.getVehicleRoster(vehicle.unit_id);
    }).catch(function (error) {
      console.log('removeVehicle', error);
    })
  }

  self.removeDoc = function(document, vehicle){
    console.log('Decument to Delete', document, 'Vehicle for Refresh:', vehicle);
    $http({
      method: 'DELETE',
      url: `vehicle/doc/delete/${document.doc_id}`
    }).then(function(response){
      self.getVehicleRoster(vehicle.unit_id);
    }).catch(function (error) {
      console.log('removeDoc', error);
    })
  }

  self.sendEditVehicle = function(vehicle){
    console.log('UPDATE', vehicle);
    $http({
      method: 'PUT',
      url: '/vehicle/edit',
      data: vehicle
    }).then((result)=>{
      self.getVehicleRoster(vehicle.unit_id);
    }).catch((error)=>{
      console.log('sendEditVehicle', error);
    })
  }
}]);
