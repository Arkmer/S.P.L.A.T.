myApp.service('ScheduleService', ['$http', '$location', function($http, $location){
  console.log('ScheduleService Loaded');
  let self = this;
  self.client = filestack.init('AmHeCOZrDRRabvKB4OtaUz');
  self.newDateInfo = {};
  self.newTaskInfo = {};
  self.newDocumentInfo = {};

  // Tier 1
  self.datesDisplay = {list: [
    {
      date: '12/4/2019',
      location: 'CRTC',
      docs: [
        {
          name: 'SDZ'
        },
        {
          name: 'Authorization'
        },
        {
          name: 'Range Brief'
        }
      ],
      tasks: [
        {
          name: 'Formation',
          command: 'SGT',
          location: '10-131',
          docs: [
            {
              name: 'DRA'
            },
            {
              name: 'Roster'
            },
            {
              name: 'Training Schedule'
            },
          ]
        },
        {
          name: 'Rifle Range',
          command: 'SGT',
          location: 'A2',
          docs: [
            {
              name: 'DRA'
            },
            {
              name: 'Roster'
            },
            {
              name: 'Training Schedule'
            },
          ]
        },
      ]
    },
    {
      date: '12/4/2019',
      location: 'CRTC',
      docs: [
        {
          name: 'SDZ'
        },
        {
          name: 'Authorization'
        },
        {
          name: 'Range Brief'
        }
      ],
      tasks: [
        {
          name: 'Formation',
          command: 'SGT',
          location: '10-131',
          docs: [
            {
              name: 'DRA'
            },
            {
              name: 'Roster'
            },
            {
              name: 'Training Schedule'
            },
          ]
        },
        {
          name: 'Rifle Range',
          command: 'SGT',
          location: 'A2',
          docs: [
            {
              name: 'DRA'
            },
            {
              name: 'Roster'
            },
            {
              name: 'Training Schedule'
            },
          ]
        },
      ]
    }
  ]};
}]);