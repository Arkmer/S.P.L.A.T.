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

  self.getGenDocs = function(date){
    return $http({
      method: 'GET',
      url: `/schedule/genDoc/all/${self.datesDisplay.list[date].id}`
    }).then((res)=>{
      self.datesDisplay.list[date].docs = res.data;
    }).catch((err)=>{
      console.log('getGenDocs', err);
    })
  }

  self.getTasks = function(date){
    return $http({
      method: 'GET',
      url: `/schedule/task/all/${self.datesDisplay.list[date].id}`
    }).then((res)=>{
      self.datesDisplay.list[date].tasks = res.data;
      for(task in self.datesDisplay.list[date].tasks){
        self.getTaskDocs(date, task).then();
      }
    }).catch((err)=>{
      console.log('getGenDocs', err);
    })
  }

  self.getTaskDocs = function(date, task){
    return $http({
      method: 'GET',
      url: `/schedule/taskDoc/all/${self.datesDisplay.list[date].tasks[task].id}`
    }).then((res)=>{
      self.datesDisplay.list[date].tasks[task].docs = res.data;
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
      swal("Document Uploaded", "", "success");
      self.newGenDoc = result.filesUploaded[0];
      self.newGenDoc.date_id = date.id;
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
    $http({
      method: 'POST',
      url: '/schedule/task',
      data: self.newTask
    }).then((res)=>{
      self.newTask.task_id = res.data[0].id;
      self.getDates(date.unit_id);
      self.newTask.name = '';
      self.newTask.time = '';
      self.newTask.command = '';
      self.newTask.location = '';
      self.newTask.date_id = '';
    }).catch((err)=>{
      console.log('addTask1', err)
    })
  }

  self.deleteTask = function(task, date){
    $http({
      method: 'DELETE',
      url: `schedule/task/delete/${task.id}`
    }).then(function(response){
      self.getDates(date.unit_id);
    }).catch(function (err) {
      console.log('deleteGenDoc', err);
    })
  }

  // ---- Task Document Functions ----
  self.addTaskDoc = function(task, date){
    console.log('Task:', task, 'Date:', date);
    self.client.pick({
      accept: '.pdf',
      maxFiles: 1
    }).then(function(result){
      swal("Document Uploaded", "", "success");
      self.newTaskDoc = result.filesUploaded[0];
      self.newTaskDoc.task_id = task.id;
      console.log('addTaskDoc', self.newTaskDoc);
      self.addTaskDoc1(self.newTaskDoc, task, date);
    })
  }

  self.addTaskDoc1 = function(postObj, task, date){
    $http({
      method: 'POST',
      url: '/schedule/taskDoc',
      data: postObj
    }).then((res)=>{
      console.log(res);
      self.newTaskDoc.doc_id = res.data[0].id;
      // console.log('doc_id:', self.newTaskDoc.doc_id);
      self.addTaskDoc2(self.newTaskDoc, task, date);
    }).catch((err)=>{
      console.log('addTaskDoc1', err)
    })
  }

  self.addTaskDoc2 = function(postObj, task, date){
    console.log('postObj:', postObj);
    $http({
      method: 'POST',
      url: '/schedule/taskDoc/join',
      data: postObj
    }).then((res)=>{
      self.getDates(date.unit_id);
      self.newTaskDoc = {};
    }).catch((err)=>{
      console.log('addTaskDoc2', err);
    })
  }

  // self.deleteTaskDoc = function(doc, task){
  //   console.log('Decument to Delete', doc, 'task for Refresh:', task);
  //   $http({
  //     method: 'DELETE',
  //     url: `schedule/taskDoc/delete/${doc.doc_id}`
  //   }).then(function(response){
  //     self.getDates(date.unit_id);
  //   }).catch(function (err) {
  //     console.log('deleteTaskDoc', err);
  //   })
  // }

}]);