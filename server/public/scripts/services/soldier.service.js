myApp.service('SoldierService', ['$http', '$location', function($http, $location){
    console.log('SoldierService Loaded');
    let self = this;
    self.client = filestack.init('AmHeCOZrDRRabvKB4OtaUz');
    self.newSoldierInfo = {};
    self.soldierRoster = {list: [
      // {
      //   rank: 'PVT',
      //   first: 'Joe',
      //   last: 'Snuffy',
      //   eval: '15Aug18',
      //   ets: '12Dec19',
      //   apft: 'Pass',
      //   docs: [
      //     {
      //       title: 'ARCOM',
      //       date: '12Jun17'
      //     },
      //     {
      //       title: 'SSD 1',
      //       date: '15Sep17'
      //     },
      //     {
      //       title: 'Anti-Terror 1',
      //       date: '25Jun17'
      //     },
      //     {
      //       title: 'CROWs Cert',
      //       date: '1Oct17'
      //     },
      //     {
      //       title: 'APFT',
      //       date: '22Jul17'
      //     },
      //   ]
      // }
    ]};
  self.addSoldier = function(newSoldierShowHide){
    newSoldierShowHide = true;
  }

  self.submitSoldier = function(send){
    console.log('submitSoldier:', send);
    $http({
      method: 'POST',
      url: '/soldier',
      data: send
    }).then((res)=>{
      self.getSoldierRoster(send.unit);
      self.newSoldierInfo = {};
      console.log('TEST unit:', send.unit);
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
    }).catch(function (error) {
      console.log('SoldierService.getSoldierRoster', error);
    })
  }

  self.addSoldierDoc = function(){
    console.log('addSoldierDoc');
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
  }]);