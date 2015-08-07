angular.module('StudyWod.controllers')
.controller('WodController',['$scope','Utility','Activities','$ionicLoading',function($scope,Utilities,Activities,$ionicLoading){
	console.log('wodCtrl')
	//console.log(Activities.getActivitiesRef());
	$scope.titolo= "Wod";
	var d = new Date()
	$scope.subtitle = "Programma di  " + Utilities.formatDate(d,true)
	var cback = function(data){
		console.log(data)
		console.log("cback gettasts")
			//instanzio la lista delle attivita
			$scope.activities = []
			for ( var activity in  data.val()){
				var task = data.val()[activity]
				task.id = activity
				$scope.activities.push(task)
			}
	}
	$scope.getTasks = function(){
		$ionicLoading.show({template:'Loading Data...'})
		console.log('retrieving  tasks')
		var cback = function(data){
			console.log("cback gettasts")
			//instanzio la lista delle attivita
			$scope.activities = []
			for ( var activity in  data.val()){
				var task = data.val()[activity]
				task.id = activity
				$scope.activities.push(task)
			}
			
			console.log(data)
			$ionicLoading.hide()
		}
		Activities.getTasks(cback)
	}
	$scope.pushDemoActivity = Activities.pushDemoActivity
	
}])