myApp.controller('ScheduleController', ['ScheduleService', 'UserService', function(ScheduleService, UserService) {
  console.log('ScheduleController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.scheduleService = ScheduleService;
  self.datesDisplay = ScheduleService.datesDisplay;


  self.toggleDateSubform = function (date) {
    date.showSubtable = !date.showSubtable;
    console.log('show/hide', date);
  }
}]);