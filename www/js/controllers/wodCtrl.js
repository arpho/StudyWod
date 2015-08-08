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
				task.done = function(){
					d = new  Date()
					next = Utilities.addDays(d,Activities.getDayst(tsk,rep)); // data prossima ripetizione
					task.nextTime = Utilities.formatDate(next)
					
					
				}
				$scope.activities.push(task)
			}
	}
	$scope.taskDone = function (id){
		$ionicLoading.show({template:'Updating Task'})
		console.log('task dione '+ id)
		var task = $scope.activities[id];
		task.nextTime =  Utilities.formatDate(Utilities.addDays(new Date(),Activities.getDays(task.rep)))
		task.rep += 1
		task.history.push(Utilities.formatDate(new Date()))
					var callback = function(){
						$ionicLoading.hide()
					}
		Activities.updateTask(id,task,callback)
	}
	$scope.getTasks = function(){
		$ionicLoading.show({template:'Loading Wod...'})
		console.log('retrieving  tasks')
		var cback = function(data){
			console.log("cback gettasts")
			//instanzio la lista delle attivita
			$scope.activities = data.val()
			
			console.log(data)
			$ionicLoading.hide()
		}
		var today = new Date()
		Activities.getTasks(Utilities.formatDate(today),cback)
	}
	$scope.pushDemoActivity = Activities.pushDemoActivity
	$scope.getTasks(Utilities.formatDate(new Date()));
}])