myApp.service('SoldierService', ['$http', '$location', function($http, $location){
    console.log('SoldierService Loaded');
    let self = this;
    self.client = filestack.init('AmHeCOZrDRRabvKB4OtaUz');
    self.newSoldierInfo = {};
    self.userUnit = 0;
    self.documents = [];
    self.soldierRoster = {list: []};
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

  self.addSoldierDoc = function(){
    self.client.pick({
      accept: '.pdf', // Needs to accept PDFs. Was 'image/*'
      maxFiles: 1
    }).then(function(result){
      alert('Successful upload.');
      self.newSoldier.docUrl = result.filesUploaded[0].url;
      console.log('addSoldierDoc', self.newSoldier.docUrl);
      console.log(result, 'result');
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