angular.module('StudyWod.controllers')
.controller('WotController',['$scope'
,'Utility'
,'$ionicLoading'
,'Activities'
,function($scope,Utilities,$ionicLoading,Activities){
	$scope.titolo = "Wot";
	var today = new Date()
	var tomorrow = Utilities.addDays(today,1)
	$scope.subtitle = "Programma di  " + Utilities.formatDate(tomorrow,true);
	var getTasks = function(){
		$ionicLoading.show({template:'Loading Wot...'})
		console.log('retrieving  tasks')
		var cback = function(data){
			console.log("cback gettasts")
			//instanzio la lista delle attivita
			$scope.activities = data.val()
			
			console.log(data)
			$ionicLoading.hide()
		}
		var today = new Date()
		var tomorrow = Utilities.addDays(today,1)
		Activities.getTasks(Utilities.formatDate(tomorrow),cback)
	}
	getTasks()
}])