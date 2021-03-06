myApp.controller('ScheduleController', ['ScheduleService', 'UserService', function(ScheduleService, UserService) {
  // console.log('ScheduleController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.scheduleService = ScheduleService;
  self.datesDisplay = ScheduleService.datesDisplay;
  self.addDate = ScheduleService.addDate;
  self.newDate = ScheduleService.newDate;
  self.getDates = ScheduleService.getDates;
  self.addGenDoc = ScheduleService.addGenDoc;
  self.deleteGenDoc = ScheduleService.deleteGenDoc;
  self.deleteDate = ScheduleService.deleteDate;
  self.addTask1 = ScheduleService.addTask1;
  self.newTask = ScheduleService.newTask;
  self.deleteTask = ScheduleService.deleteTask;
  self.addTaskDoc = ScheduleService.addTaskDoc;

  self.getDates(self.userObject.unit_id);

  self.toggleDateSubform = function (date) {
    date.showSubtable = !date.showSubtable;
  }

  self.toggleTaskSubform = function (task) {
    task.showSubtable = !task.showSubtable;
  }

  self.toggleTaskInputs = function (date) {
    date.showTaskInputs = !date.showTaskInputs;
  }

  self.dateInputShow = function (){
    self.addInputs = !self.addInputs;
  }

  self.attachUnitToAddDate = function(){
    self.addDate(self.userObject.unit_id)
  }
}]);