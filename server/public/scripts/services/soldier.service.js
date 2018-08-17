myApp.service('SoldierService', ['$http', '$location', function($http, $location){
    // console.log('SoldierService Loaded');
    let self = this;
    self.client = filestack.init('AmHeCOZrDRRabvKB4OtaUz');
    self.newSoldierInfo = {};
    self.userUnit = 0;
    self.documents = [];
    self.newDocument = {};
    self.soldierRoster = {list: []};

  self.submitSoldier = function(send){
    $http({
      method: 'POST',
      url: '/soldier',
      data: send
    }).then((res)=>{
      self.getSoldierRoster(send.unit);
      self.newSoldierInfo = {};
    }).catch((error)=>{
      console.log('submitSoldier', error)
    })
  }

  self.getSoldierRoster = function(unit){
    $http({
      method: 'GET',
      url: `/soldier/${unit}`
    }).then(function(response){
      self.soldierRoster.list = response.data;
      self.userUnit = unit;
      for(soldier in self.soldierRoster.list){
        self.soldierDocs(soldier).then();
      }
    }).catch(function (error) {
      console.log('getSoldierRoster', error);
    })
  }

  self.soldierDocs = function(temp){
    return $http({
      method: 'GET',
      url: `/soldier/docs/${self.soldierRoster.list[temp].id}`
    }).then((res)=>{
      self.soldierRoster.list[temp].docs = res.data;
    }).catch((err)=>{
      console.log('soldierDocs', err);
    })
  }

  self.removeSoldier = function(soldier){
    let removeId = soldier.id;
    $http({
      method: 'DELETE',
      url: `/soldier/${removeId}`
    }).then(function(response){
      self.getSoldierRoster(soldier.unit_id);
    }).catch(function (error) {
      console.log('removeSoldier', error);
    })
  }

  self.addSoldierDoc = function(soldier){
    self.client.pick({
      accept: '.pdf',
      maxFiles: 1
    }).then(function(result){
      swal("Document Uploaded", "", "success");
      self.newDocument = result.filesUploaded[0];
      self.newDocument.soldier_id = soldier.id;
      self.addSoldierDoc1(self.newDocument, soldier);
    })
  }

  self.addSoldierDoc1 = function(postObj, soldier){
    $http({
      method: 'POST',
      url: '/soldier/doc',
      data: postObj
    }).then((res)=>{
      self.addSoldierDoc2(self.newDocument, soldier);
    }).catch((error)=>{
      console.log('addSoldierDoc1', error)
    })
  }

  self.addSoldierDoc2 = function(getObj, soldier){
    $http({
      method: 'GET',
      url: `/soldier/doc/id/${getObj.uploadId}`
    }).then((res)=>{
      self.newDocument.doc_id = res.data.rows[0].id;
      self.addSoldierDoc3(self.newDocument, soldier);
    }).catch((error)=>{
      console.log('addSoldierDoc2', error);
    })
  }

  self.addSoldierDoc3 = function(postObj, soldier){
    $http({
      method: 'POST',
      url: '/soldier/doc/join',
      data: postObj
    }).then((res)=>{
      self.getSoldierRoster(soldier.unit_id);
      self.newDocument = {};
    }).catch((error)=>{
      console.log('addSoldierDoc3', error);
    })
  }

  self.removeDoc = function(document, soldier){
    console.log('Decument to Delete', document, 'Soldier for Refresh:', soldier);
    $http({
      method: 'DELETE',
      url: `soldier/doc/delete/${document.doc_id}`
    }).then(function(response){
      self.getSoldierRoster(soldier.unit_id);
    }).catch(function (error) {
      console.log('removeDoc', error);
    })
  }

  self.clearInputs = function(){
    self.newSoldierInfo.rank = '';
    self.newSoldierInfo.last = '';
    self.newSoldierInfo.first = '';
    self.newSoldierInfo.eval = '';
    self.newSoldierInfo.ets = '';
    self.newSoldierInfo.position = '';
  }

  self.editSoldier = function(){
    // Edit fields are not keeping dates as presented in the table; hold off until solution can be found.
  }
}]);