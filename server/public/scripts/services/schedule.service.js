myApp.service('ScheduleService', ['$http', '$location', function($http, $location){
  // console.log('ScheduleService Loaded');
  let self = this;
  self.client = filestack.init('AmHeCOZrDRRabvKB4OtaUz');
  self.newDateInfo = {};
  self.newTaskInfo = {};
  self.newDocumentInfo = {};
  self.newDate = {};
  self.newGenDoc = {};

  // Very large dummy object.
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


  // ---- Page Resetting Functions ----
  self.getDates = function(unit_id){
    $http({
      method: 'GET',
      url: `/schedule/getDates/${unit_id}`
    }).then((res)=>{
      self.datesDisplay.list = res.data;
      for(date in self.datesDisplay.list){
        self.getGenDocs(date).then();
      }
      // GET for tasks
    }).catch((err)=>{
      console.log('addDate', err)
    })
  }

  self.getGenDocs = function(temp){
    return $http({
      method: 'GET',
      url: `/schedule/genDoc/all/${self.datesDisplay.list[temp].id}`
    }).then((res)=>{
      self.datesDisplay.list[temp].docs = res.data;
    }).catch((err)=>{
      console.log('getGenDocs', err);
    })
  }


  // ---- Date Functions ----
  self.addDate = function(unit_id){
    self.newDate.unit_id = unit_id;
    $http({
      method: 'POST',
      url: '/schedule/addDate',
      data: self.newDate
    }).then((res)=>{
      self.getDates(unit_id)
      self.newDate.date = '';
      self.newDate.location = '';
    }).catch((err)=>{
      console.log('addDate', err)
    })
  }

  self.deleteDate = function(date){
    console.log('Date to delete:', date);
    $http({
      method: 'DELETE',
      url: `schedule/date/delete/${date.id}`
    }).then(function(response){
      self.getDates(date.unit_id);
    }).catch(function (err) {
      console.log('deleteDate', err);
    })
  }


  // ---- General Document Functions ----
  self.addGenDoc = function(date){
    self.client.pick({
      accept: '.pdf',
      maxFiles: 1
    }).then(function(result){
      alert('Successful upload.');
      self.newGenDoc = result.filesUploaded[0];
      self.newGenDoc.date_id = date.id;
      console.log('newGenDoc', self.newGenDoc);
      self.addGenDoc1(self.newGenDoc, date);
    })
  }

  self.addGenDoc1 = function(postObj, date){
    $http({
      method: 'POST',
      url: '/schedule/genDoc',
      data: postObj
    }).then((res)=>{
      self.addGenDoc2(self.newGenDoc, date);
    }).catch((err)=>{
      console.log('addGenDoc1', err)
    })
  }

  self.addGenDoc2 = function(getObj, date){
    $http({
      method: 'GET',
      url: `/schedule/genDoc/id/${getObj.uploadId}`
    }).then((res)=>{
      self.newGenDoc.doc_id = res.data.rows[0].id;
      self.addGenDoc3(self.newGenDoc, date);
    }).catch((err)=>{
      console.log('addGenDoc2', err);
    })
  }

  self.addGenDoc3 = function(postObj, date){
    $http({
      method: 'POST',
      url: '/schedule/genDoc/join',
      data: postObj
    }).then((res)=>{
      self.getDates(date.unit_id);
      self.newGenDoc = {};
    }).catch((err)=>{
      console.log('addGenDoc3', err);
    })
  }

  self.deleteGenDoc = function(doc, date){
    console.log('Decument to Delete', doc, 'date for Refresh:', date);
    $http({
      method: 'DELETE',
      url: `schedule/genDoc/delete/${doc.doc_id}`
    }).then(function(response){
      self.getDates(date.unit_id);
    }).catch(function (err) {
      console.log('deleteGenDoc', err);
    })
  }


  // ---- Task Functions ----
  self.addGenDoc = function(date){
    self.client.pick({
      accept: '.pdf',
      maxFiles: 1
    }).then(function(result){
      alert('Successful upload.');
      self.newGenDoc = result.filesUploaded[0];
      self.newGenDoc.date_id = date.id;
      console.log('newGenDoc', self.newGenDoc);
      self.addGenDoc1(self.newGenDoc, date);
    })
  }

  self.addGenDoc1 = function(postObj, date){
    $http({
      method: 'POST',
      url: '/schedule/genDoc',
      data: postObj
    }).then((res)=>{
      self.addGenDoc2(self.newGenDoc, date);
    }).catch((err)=>{
      console.log('addGenDoc1', err)
    })
  }

  self.addGenDoc2 = function(getObj, date){
    $http({
      method: 'GET',
      url: `/schedule/genDoc/id/${getObj.uploadId}`
    }).then((res)=>{
      self.newGenDoc.doc_id = res.data.rows[0].id;
      self.addGenDoc3(self.newGenDoc, date);
    }).catch((err)=>{
      console.log('addGenDoc2', err);
    })
  }

  self.addGenDoc3 = function(postObj, date){
    $http({
      method: 'POST',
      url: '/schedule/genDoc/join',
      data: postObj
    }).then((res)=>{
      self.getDates(date.unit_id);
      self.newGenDoc = {};
    }).catch((err)=>{
      console.log('addGenDoc3', err);
    })
  }
}]);