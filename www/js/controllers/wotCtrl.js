angular.module('StudyWod.controllers')
.controller('WotController',['$scope','Utility',function($scope,Utilities){
	$scope.titolo = "Wot";
	var today = new Date()
	var tomorrow = Utilities.addDays(today,1)
	$scope.subtitle = "Programma di  " + Utilities.formatDate(tomorrow,true);
	
}])