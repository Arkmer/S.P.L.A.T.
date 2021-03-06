myApp.controller('SoldierController', ['SoldierService', 'UserService', function(SoldierService, UserService) {
  // console.log('SoldierController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.soldierService = SoldierService;
  self.soldierRoster = SoldierService.soldierRoster;
  self.addSoldierDoc = SoldierService.addSoldierDoc;
  self.newSoldierInfo = SoldierService.newSoldierInfo;
  self.newSoldierInfo.unit = self.userObject.unit_id;
  self.submitSoldier = SoldierService.submitSoldier;
  self.getSoldierRoster = SoldierService.getSoldierRoster;
  self.removeSoldier = SoldierService.removeSoldier;
  self.newDocument = SoldierService.newDocument;
  self.removeDoc = SoldierService.removeDoc;
  self.clearInputs = SoldierService.clearInputs;

  self.getSoldierRoster(self.userObject.unit_id);

  self.toggleSoldierDocs = function (soldier) {
    soldier.showSubtable = !soldier.showSubtable;
  }

  self.toggleNewSoldier = function(){
    self.inputsShowHide = !self.inputsShowHide;
  }

  self.submitSoldierController = function(){
    let completeNewSoldier = self.newSoldierInfo;
    completeNewSoldier.unit = self.userObject.unit_id;
    self.submitSoldier(completeNewSoldier);
  }

  self.toggleSoldierSubform = function (soldier) {
    soldier.showSubtable = !soldier.showSubtable;
    // console.log('show/hide', soldier);
  }

  self.toggleEdit = function (soldier) {
    soldier.showEdit = !soldier.showEdit;
    // console.log('show/hide', soldier);
  }

  self.editSoldierInputs = function(soldier){
    soldier.inputsShowHide = !soldier.inputsShowHide;
  }
}]);