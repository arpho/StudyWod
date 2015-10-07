angular.module('StudyWod.controllers')
.controller('AllController',['$scope'
                                                ,'Utility'
                                                ,'Activities'
                                                ,'$ionicLoading'
                                                ,'$ionicModal'
                                                ,'User'
                                                , '$log'
												,'$state'
												,'$ionicSideMenuDelegate'
                                                ,function($scope,Utilities,Activities,$ionicLoading,$ionicModal,User,log,$state,$menuDelegate){


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
	$scope.titolo = "All";
	var today = new Date()
	var tomorrow = Utilities.addDays(today,1)
	$scope.subtitle = "All tasks  " //+ Utilities.formatDate(tomorrow,true);

$scope.activities ={}
$scope.activities['a'] = {'activity':'ciao','nota':'test statico'}


$scope.updateTask = function(tid){
     $scope.task = $scope.activities[tid]
     console.log("updating task")
     $scope.filter2Use ='allFilter'
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


$scope.showNextTimeTask = function(){
	return true
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

//creo la funzione filtro
													$scope.matchCriteria = function(criteria){
														return function(item){
															console.log('todo:',item.nextTime== criteria)
															console.log('just inserted or just done:',item.lastTime==criteria)
															return true
														}
													}




	if (User.isLogged()){
  	var taskCback = function(data){
       $scope.activities = data.val()// Activities.normalizeTasks( data)
       console.log(' acquisita la lista  dei task ')
       $ionicLoading.hide()
    }
    $ionicLoading.show({template:'loading task...'})
    Activities.getAllTasks(taskCback)
      //$scope.activities = Activities.getTasksList()
    }
}])
