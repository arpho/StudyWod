angular.module('StudyWod.controllers')
.controller('WotController',['$scope'
                                                ,'Utility'
                                                ,'Activities'
                                                ,'$ionicLoading'
                                                ,'$ionicModal'
                                                ,'User'
                                                , '$log'
												,'$state'
												,'$ionicSideMenuDelegate'
                                                ,function($scope,Utilities,Activities,$ionicLoading,$ionicModal,User,log,$state,$menuDelegate){
$ionicModal.fromTemplateUrl('templates/task.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.openModal = function() {
    $scope.modal.show();
  };
  
  $scope.showMenu = function() {
	  console.log('menu')
    $menuDelegate.toggleLeft();
  };
  
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });													
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
  
$scope.doCreateTask = function(task){
      $ionicLoading.show({template:'Creating new task...'})
      var cback = function(){
          $ionicLoading.hide()
      }
      
      Activities.createTask(task,cback)
  }
  
$scope.newTask = function(){
      $scope.task = {}
      $scope.task.history = [Utilities.formatDate(new Date())]
      $scope.task.lastTime = Utilities.formatDate(new Date())
      $scope.task.nextTime = Utilities.formatDate(Utilities.addDays(new Date(),1))
      $scope.task.rep =0;
      $scope.action ='Crea'
	  
      $scope.doAction = function(){
          $scope.doCreateTask($scope.task)
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
	else{
	 Utilities.setPreviousState('wot')
	 $state.go('signin')
	}
}])