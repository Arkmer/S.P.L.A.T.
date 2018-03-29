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
          name: 'DRA'
        },
      ],
      tasks: [
        {
          name: 'Formation',
          time: '12:30',
          command: 'SGT Rhae',
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
          time: '12:30',
          command: 'SGT Casey',
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
            {
              name: 'Authorization'
            },
            {
              name: 'Range Brief'
            },
            {
              name: 'SDZ'
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
          name: 'DRA'
        },
      ],
      tasks: [
        {
          name: 'Formation',
          time: '12:30',
          command: 'SGT Lentz',
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
          time: '12:30',
          command: 'SGT Affolter',
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
            {
              name: 'Authorization'
            },
            {
              name: 'Range Brief'
            },
            {
              name: 'SDZ'
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
          name: 'DRA'
        },
      ],
      tasks: [
        {
          name: 'Formation',
          time: '12:30',
          command: 'SGT Rhae',
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
          time: '12:30',
          command: 'SGT Casey',
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
            {
              name: 'Authorization'
            },
            {
              name: 'Range Brief'
            },
            {
              name: 'SDZ'
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
          name: 'DRA'
        },
      ],
      tasks: [
        {
          name: 'Formation',
          time: '12:30',
          command: 'SGT Lentz',
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
          time: '12:30',
          command: 'SGT Affolter',
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
            {
              name: 'Authorization'
            },
            {
              name: 'Range Brief'
            },
            {
              name: 'SDZ'
            },
          ]
        },
      ]
    },
  ]};
}]);