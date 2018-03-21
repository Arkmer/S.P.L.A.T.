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
        docs: [1, 2, 3, 4, 5]
      },
      {
        rank: 'SPC',
        first: 'Curly',
        last: 'Tent-Peg',
        eval: '15Sep18',
        ets: '12Oct20',
        apft: 'Fail',
        docs: [1, 2, 3, 4, 5]
      },
    ];
  self.simple = function(){
    console.log('clicked');
  }
  }]);