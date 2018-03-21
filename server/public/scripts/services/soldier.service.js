myApp.service('SoldierService', ['$http', '$location', function($http, $location){
    console.log('SoldierService Loaded');
    var self = this;
    self.soldierRoster = [
      {
        rank: 'PVT',
        first: 'Joe',
        last: 'Snuffy',
        eval: '15Aug18',
        ets: '12Dec19',
        apft: 'Pass',
        docs: [
          {
            title: 'ARCOM',
            date: '12Jun17'
          },
          {
            title: 'SSD 1',
            date: '15Sep17'
          },
          {
            title: 'Anti-Terror 1',
            date: '25Jun17'
          },
          {
            title: 'CROWs Cert',
            date: '1Oct17'
          },
          {
            title: 'APFT',
            date: '22Jul17'
          },
        ]
      },
      {
        rank: 'SPC',
        first: 'Curly',
        last: 'Tent-Peg',
        eval: '15Sep18',
        ets: '12Oct20',
        apft: 'Fail',
        docs: [
          {
            title: 'ARCOM',
            date: '12Jun17'
          },
          {
            title: 'SSD 1',
            date: '15Sep17'
          },
          {
            title: 'Anti-Terror 1',
            date: '25Jun17'
          },
          {
            title: 'CROWs Cert',
            date: '1Oct17'
          },
          {
            title: 'APFT',
            date: '22Jul17'
          },
        ]
      },
    ];
  self.addSoldier = function(){
    console.log('Add Soldier');
  }
  self.addDoc = function(soldier){
    console.log('Add Doc to', soldier);
  }
  }]);