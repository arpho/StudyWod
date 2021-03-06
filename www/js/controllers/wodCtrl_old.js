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
                                                ,'$rootScope'
                                                ,'$ionicActionSheet'
                                                ,function($scope,Utilities,Activities,$ionicLoading,$ionicModal,User,log,$state,$menuDelegate,$rootScope,$ionicActionSheet){
                                                    $ionicModal.fromTemplateUrl('templates/task.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
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
                                                                    next = Utilities.addDays(today,Activities.getDays(task,task.rep)); // data prossima ripetizione
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
                                                    console.log ('wodctrl carica i task')
                                                        var loadingText = {'wod':'Loading Wod...','wot':'Loading Wot...','all':'Loading All The Tasks...'}
                                                        //$ionicLoading.show({template:loadingText[$state.current.name]})
                                                        var today = new Date()
                                                        /*var cback = function(data){
                                                            //instanzio la lista delle attivita
                                                            $scope.activities = data.val()
                                                         //   $ionicLoading.hide() // nascondo la rotellina
                                                            // seconda chiamata a firebase
                                                            //Activities.getTasks(Utilities.formatDate(today),cback2,'lastTime')
                                                        }
                                                        //Activities.getTasks(Utilities.formatDate(today),cback)
                                                       Activities.getAllTasks(cback)*/
                                                    }
                                                        $scope.criteria = Utilities.formatDate(new Date); // imposto i criteri del filtro
                                                        //creo la funzione filtro
                                                    /*    $scope.criteriaMatch = function(criteria){
                                                            return function(item){
                                                                console.log('todo:',item.nextTime== criteria)
                                                                console.log('just inserted or just done:',item.lastTime==criteria)
                                                                return (item.nextTime== criteria)
                                                            }
                                                        }*/


                                                    $scope.getWodsTasks = function(){
                                                        $ionicLoading.show({template:'Loading Wod...'})
                                                        var today = new Date()
                                                        ,cback = function(data){
                                                            //popolo la lista delle attivita da fare in giornata
                                                            $scope.activities = data.val()
                                                            //callback invocato dalla chiamata a firebase per i task inseriti e/o svolti in giornata
                                                            var innerCback = function(data){
                                                                console.log('innerCback')
                                                                Utilities.addObj($scope.activities,data.val())// aggiungo le attività della seconda chiamata a quelle della prima

                                                            $ionicLoading.hide() // nascondo la rotellina
                                                            }
                                                            $scope.activities = Activities.getTasksList() // richiedo al servizio i task caricati al login
                                                            //Activities.getTasks(Utilities.formatDate(today),innerCback,'lastTime')//chiamata a firebase per le attività svolte  in giornata

                                                        }
                                                        Activities.getTasks(Utilities.formatDate(today),cback)//chiamata a firebase per le attività odierne
                                                    }
                                                    // $scope.myComparator = function(obj){
                                                        // if (obj.lastTime == Utilities.formatDate(today) ||obj.nextTime == Utilities.formatDate(today)) return true
                                                    // } //imposto il criterio del filtro per visualizzare i task che hanno nextTime  o lastTime oggi
                                                    $scope.getTasks = getTasks
                                                    $scope.doDelete = function(tid){
                                                        $ionicLoading.show({template:'Deleting task...'})
                                                        Activities.deleteTask(tid,function(res){
                                                            $ionicLoading.hide()
                                                            if (res) Utilities.notify('spiacente, qualcosa è andata male')
                                                            else {
                                                              Utilities.notify('il task è stato cancellato')
                                                              //ricarico la lista dei task
                                                              var cbackTasks = function(data){
                                                                                activities.setTasks(data) // setto i task in activities
                                                                                $ionicLoading.hide();// chiudo la rotella del caricamento task
                                                                              }
                                                              activities.getAllTasks(cbackTasks)
                                                              $scope.activities = Activities.getTasksList()
                                                            }
                                                        })

                                                    }
                                                    $scope.showNextTimeTask = function(){
                                                        return false
                                                    }
                                                    $scope.deleteTask = function(tid){
                                                        Utilities.confirmPopup('cancellare '+$scope.activities[tid].activity+'?','Vuoi proprio cancellarlo?',function(){$scope.doDelete(tid)},function(){console.log('no non vuole')})
                                                    }
                                                    $scope.actionSheet= function(tid){
                                                        $ionicActionSheet.show({
                                                             buttons: [
                                                               { text: 'Completato' },
                                                               { text: 'Modifica' },
                                                               { text: 'Cancella' }
                                                             ],
                                                             titleText: 'Task Actions',
                                                             cancelText: 'Annulla',
                                                             buttonClicked: function(index) {
                                                                 var action ={0:$scope.taskDone,1:$scope.updateTask,2:$scope.deleteTask}
                                                                 action[index](tid)
                                                               return true;
                                                             }
                                                           });
                                                    }
                                                    /*$scope.criteria = Utilities.formatDate(new Date())
                                                    $scope.criteriaMatch = function (criteria){
                                                        console.log('criteriaMatch')
                                                        return function(item){
                                                            console.log('item',item)
                                                            return (item.lastTime == criteria )||(item.nextTime == criteria) /*voglio vedere oltre ai task
                                                            //in programma per oggi i task aggiunti  e svolti in giornata
                                                        }
                                                    }*/

  if (User.isLogged()){
    // $scope.getWodsTasks ()
    console.log('wod ctrl carica tasks')
    $scope.activities = Activities.getTasksList()

  }
  else {
     //Utilities.setPreviousState('wod')
     $state.go('signin')
  }
}])
