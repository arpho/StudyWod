angular.module('StudyWod.controllers')
.controller('WodController',[
                                                '$scope'
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
  
  $scope.doUpdateTask = function(tid,task){
      console.log('doUpdateTask '+tid)
      console.log(task)
     $ionicLoading.show({template:"Updating Task..."})
      var cback = function(error){
          console.log('update error')
          console.log(error)
          $ionicLoading.hide()
          $scope.closeModal() //chiudo la finestra modale
      }
      Activities.updateTask(tid,task,cback)
  }
  
  $scope.doCreateTask = function(task){
      $ionicLoading.show({template:'Creating new task...'})
      var cback = function(){
          $ionicLoading.hide()
		  $scope.closeModal()
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
  $scope.updateTask = function(tid){
     $scope.task = $scope.activities[tid]
     console.log("updating task")
     $scope.action = "Update" // imposto il testo del pulsante nella finestra modale
     $scope.doAction = function(){
         $scope.doUpdateTask(tid,$scope.task)
         console.log('nota '+$scope.task.nota)
     }
     $scope.openModal();
  }
                                                    $scope.titolo= "Wod";
                                                    $scope.action = "test click"
                                                    var d = new Date()
                                                    $scope.subtitle = "Work of the day  " + Utilities.formatDate(d,true)
                                                    var cback = function(data){
                                                        console.log(data)
                                                        console.log("cback gettasts")
                                                            //instanzio la lista delle attivita
                                                            $scope.activities = []
                                                            for ( var activity in  data.val()){
                                                                var task = data.val()[activity]
                                                                task.id = activity
                                                                task.done = function(){
                                                                    today = new  Date()
                                                                    task.lastTime = Utilities.formatDate(today)
                                                                    next = Utilities.addDays(today,Activities.getDayst(tsk,rep)); // data prossima ripetizione
                                                                    task.nextTime = Utilities.formatDate(next)
                                                                    
                                                                    
                                                                }
                                                                $scope.activities.push(task)
                                                            }
                                                    }
                                                    $scope.taskDone = function (id){
                                                        $ionicLoading.show({template:'Updating Task'})
                                                        var task = $scope.activities[id];
                                                        task.nextTime =  Utilities.formatDate(Utilities.addDays(new Date(),Activities.getDays(task.rep)))
                                                        task.rep += 1
                                                        task.history.push(Utilities.formatDate(new Date()))
                                                                    var callback = function(){
                                                                        $ionicLoading.hide()
																		Utilities.notify("next time on "+ task.nextTime)
                                                                    }
                                                        Activities.updateTask(id,task,callback)
                                                    }
                                                    var getTasks = function(){
                                                        $ionicLoading.show({template:'Loading Wod...'})
                                                        console.log('retrieving  tasks')
                                                        var cback = function(data){
                                                            console.log("cback gettasts")
															console.log (data);
                                                            //instanzio la lista delle attivita
                                                            $scope.activities = data.val()
                                                            
                                                            console.log(data)
                                                            $ionicLoading.hide()
                                                        }
                                                        var today = new Date()
                                                        Activities.getTasks(Utilities.formatDate(today),cback)
                                                    }
                                                    $scope.pushDemoActivity = Activities.pushDemoActivity

  if (User.isLogged())
     getTasks()
  else {
     Utilities.notify('You are not logged in!!')
	 Utilities.setPreviousState('wod')
	 $state.go('signin')
  }                                            
}])