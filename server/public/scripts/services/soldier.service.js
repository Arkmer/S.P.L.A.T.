myApp.service('SoldierService', ['$http', '$location', function($http, $location){
    console.log('SoldierService Loaded');
    let self = this;
    self.client = filestack.init('AmHeCOZrDRRabvKB4OtaUz');
    self.newSoldierInfo = {};
    self.userUnit = 0;
    self.documents = [];
    self.newDocument = {};
    self.soldierRoster = {list: []};
    self.joinSoldierDoc
  self.addSoldier = function(newSoldierShowHide){
    newSoldierShowHide = true;
  }

  self.submitSoldier = function(send){
    // console.log('submitSoldier:', send);
    $http({
      method: 'POST',
      url: '/soldier',
      data: send
    }).then((res)=>{
      self.getSoldierRoster(send.unit);
      self.newSoldierInfo = {};
      // console.log('TEST unit:', send.unit);
    }).catch((error)=>{
      console.log('SoldierService.submitSoldier', error)
    })
  }

  self.addDoc = function(soldier){
    console.log('Add Doc to', soldier);
  }

  self.getSoldierRoster = function(unit){
    $http({
      method: 'GET',
      url: `/soldier/${unit}`
    }).then(function(response){
      self.soldierRoster.list = response.data;
      self.userUnit = unit;
      for(soldier in self.soldierRoster.list){
        // console.log('Soldier Info:', self.soldierRoster.list[soldier].last, self.soldierRoster.list[soldier].id);
        self.soldierDocs(soldier).then();
      }
    }).catch(function (error) {
      console.log('SoldierService.getSoldierRoster', error);
    })
  }

  self.removeSoldier = function(soldier){
    let removeId = soldier.id;
    $http({
      method: 'DELETE',
      url: `/soldier/${removeId}`
    }).then(function(response){
      // console.log('then removeSoldier:', soldier.unit_id);
      self.getSoldierRoster(soldier.unit_id);
    }).catch(function (error) {
      console.log('SoldierService.removeSoldier', error);
    })
  }

  self.update = function(){
    console.log('Update:', self.newDocument);
  }

  self.addSoldierDoc = function(soldier){
    self.client.pick({
      accept: '.pdf',
      maxFiles: 1
    }).then(function(result){
      alert('Successful upload.');
      self.newDocument = result.filesUploaded[0];
      self.newDocument.soldier_id = soldier.id;
      // self.update();
      self.addSoldierDoc1(self.newDocument, soldier);
    })
  }

  self.addSoldierDoc1 = function(postObj, soldier){
    // self.update();
    console.log('POST #1', soldier);
    $http({
      method: 'POST',
      url: '/soldier/doc',
      data: postObj
    }).then((res)=>{
      self.addSoldierDoc2(self.newDocument, soldier);
    }).catch((err)=>{
      console.log('SoldierService.submitSoldier', err)
    })
  }

  self.addSoldierDoc2 = function(getObj, soldier){
    // self.update();
    console.log('GET #1', soldier);
    // console.log('postObj.uploadId', getObj.uploadId);
    $http({
      method: 'GET',
      url: `/soldier/doc/id/${getObj.uploadId}`
    }).then((res)=>{
      console.log('GET response:', res.data.rows[0].id);
      self.newDocument.doc_id = res.data.rows[0].id;
      self.update();
      self.addSoldierDoc3(self.newDocument, soldier);
    }).catch((erro)=>{
      console.log('Catch', erro);
    })
  }

  self.addSoldierDoc3 = function(postObj, soldier){
    console.log('POST #2', soldier);
    $http({
      method: 'POST',
      url: '/soldier/doc/join',
      data: postObj
    }).then((res)=>{
      console.log('soldier.unit_id', soldier.unit_id);
      self.getSoldierRoster(soldier.unit_id, soldier);
      self.newDocument = {};
    }).catch((error)=>{
      console.log('SoldierService.getSoldierRoster', error);
    })
  }

  self.soldierDocs = function(temp){
    return $http({
      method: 'GET',
      url: `/soldier/docs/${self.soldierRoster.list[temp].id}`
    }).then((res)=>{
      self.soldierRoster.list[temp].docs = res.data;
      // console.log(self.soldierRoster.list[temp].last, self.soldierRoster.list[temp].docs);
    }).catch((err)=>{
      console.log('SoldierService.getSoldierRoster.Docs', err);
    })
  }
}]);