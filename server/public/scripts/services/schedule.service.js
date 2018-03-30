myApp.service('ScheduleService', ['$http', '$location', function($http, $location){
  // console.log('ScheduleService Loaded');
  let self = this;

  self.client = filestack.init('AmHeCOZrDRRabvKB4OtaUz');

  self.newDate = {};
  self.newGenDoc = {};
  self.newTask = {};
  self.newTaskDoc = {};

  // ----!! THIS IS WHERE EVERYTHING GOES !!----
  self.datesDisplay = {list: []};


  // ---- Page Resetting Functions ----
  self.getDates = function(unit_id){
    $http({
      method: 'GET',
      url: `/schedule/getDates/${unit_id}`
    }).then((res)=>{
      self.datesDisplay.list = res.data;
      for(date in self.datesDisplay.list){
        self.getGenDocs(date).then();
        self.getTasks(date).then();
      }
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

  self.getTasks = function(temp){
    return $http({
      method: 'GET',
      url: `/schedule/task/all/${self.datesDisplay.list[temp].id}`
    }).then((res)=>{
      self.datesDisplay.list[temp].tasks = res.data;
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
  self.addTask1 = function(date){
    self.newTask.date_id = date.id;
    self.newTask.time = self.newTask.time.toString().substring(16, 24);
    console.log('Object', self.newTask.time);
    $http({
      method: 'POST',
      url: '/schedule/task',
      data: self.newTask
    }).then((res)=>{
      self.newTask.task_id = res.data[0].id;
      self.getDates(date.unit_id);
      self.newTask = {};
    }).catch((err)=>{
      console.log('addTask1', err)
    })
  }

  self.deleteTask = function(task, date){
    console.log('Task to Delete', task, 'date for Refresh:', date);
    $http({
      method: 'DELETE',
      url: `schedule/task/delete/${task.id}`
    }).then(function(response){
      self.getDates(date.unit_id);
    }).catch(function (err) {
      console.log('deleteGenDoc', err);
    })
  }
}]);