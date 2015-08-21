angular.module('StudyWod.controllers')
.controller('WotController',['$scope'
,'Utility'
,'$ionicLoading'
,'Activities'
,'User'
,function($scope,Utilities,$ionicLoading,Activities,User){
	$scope.titolo = "Wot";
	var today = new Date()
	var tomorrow = Utilities.addDays(today,1)
	$scope.subtitle = "Work of Tomorrow  " + Utilities.formatDate(tomorrow,true);

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


$scope.updateTask = function(tid){
     $scope.task = $scope.activities[tid]
     console.log("updating task")
     $scope.action = "Modifica" // imposto il testo del pulsante nella finestra modale
     $scope.doAction = function(){
         $scope.doUpdateTask(tid,$scope.task)
         console.log('nota '+$scope.task.nota)
     }
     $scope.openModal();
  }

$scope.taskDone = function (id){
    $ionicLoading.show({template:'Updating Task'})
    var task = $scope.activities[id];
    task.nextTime =  Utilities.formatDate(Utilities.addDays(new Date(),Activities.getDays(task.rep)))
    task.rep += 1
    task.history.push(Utilities.formatDate(new Date()))
 	var callback = function(){
        $ionicLoading.hide()
    }
    Activities.updateTask(id,task,callback)
}


	if (User.isLogged())
		 getTasks()
	else
     Utilities.notify('You are not logged in!!')
}])