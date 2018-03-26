myApp.controller('ScheduleController', ['ScheduleService', 'UserService', function(ScheduleService, UserService) {
  console.log('ScheduleController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.scheduleService = ScheduleService;
}]);