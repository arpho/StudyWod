angular.module('StudyWod.controllers')
.controller('WodController',[
                                                '$scope'
                                                ,'Utility'
                                                ,'Activities'
                                                ,'$ionicLoading'
                                                ,'$ionicPopup'
                                                ,'User'
                                                , '$log'
                                                ,'$state'
                                                ,'$ionicSideMenuDelegate'
                                                ,'$rootScope'
                                                ,'$ionicActionSheet'
                                                ,'$ionicModal'
                                                ,function($scope
                                                ,Utilities
                                                ,Activities
                                                ,$ionicLoading
                                                ,$ionicPopup
                                                ,User
                                                ,log
                                                ,$state
                                                ,$menuDelegate
                                                ,$rootScope
                                                ,$ionicActionSheet
                                                ,$ionicModal){
                                                /*questa funzione mostra  i task se rispettano le condizioni di filtro
                                                     @param object il task da verificare
                                                     @return boolean true se da visualizzare*/
                                                     $scope.show = function(key){
                                                     item = $scope.activities[key]
                                                     day = Utilities.formatDate(new Date(),true);
                                                     var out =( item.nextTime ==day ||item.lastTime == day)
                                                      console.log('task visible: ',out)
                                                     return out;
                                                     }
                                                $ionicModal.fromTemplateUrl('templates/loginPopup.html', {
                                                    scope: $scope,
                                                    animation: 'slide-in-up'
                                                  }).then(function(modal) {
                                                  console.log('setting modal',modal)
                                                    $scope.modal = modal;
                                                    $scope.openModal = function() {
                                                     $scope.modal.show();
                                                    };
                                                    $scope.closeModal = function() {
                                                       $scope.modal.hide();
                                                    };
                                                    $scope.openModal()
                                                  });



                                                  //Cleanup the modal when we're done with it!
                                                  $scope.$on('$destroy', function() {
                                                    $scope.modal.remove();
                                                  });
                                                    //Cleanup the modal when we're done with it!
                                                    $scope.$on('$destroy', function() {
                                                      $scope.modal.remove();
                                                    });

                                                    // Execute action on hide modal
                                                    $scope.$on('modal.hidden', function() {
                                                      // Execute action
                                                    });
                                                    // Execute action on remove modal
                                                    $scope.$on('modal.removed', function() {
                                                      // Execute action
                                                  });
                                                                    $scope.titolo = "Wod";
                                                                    var today = new Date
                                                                    //definisco il parametro del filtro
                                                                    $scope.day = Utilities.formatDate(today,true);
                                                                    //definisco il filtro da usare nella lista dei task
                                                                    $scope.filter2Use ='wodFilter'
                                                                    //  definisco il parametro per il filtro
                                                                    //$scope.filterParameters ={'$': 'nextTime':$scope.day,'lastTime':$scope.day}
                                                                    $scope.subtitle = "Work of Today  " + Utilities.formatDate(today,true);
                                                console.log('wodctrl')

                                                    $scope.deleteTask = function(tid){
                                                    //TODO memorizzare i taskattivi in rootScope oppure creare delete task in Activities che è meglio
                                                        Utilities.confirmPopup('cancellare '+Utilities.retrieveTask(tid,Activities.getVisualizedTasks()).activity+'?','Vuoi proprio farlo?',function(){$scope.doDelete(tid)},function(){console.log('no non vuole')})
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
                                                                 action[index](tid,Activities.getVisualizedTasks())
                                                               return true;
                                                             }
                                                           });
                                                    }

$scope.doUpdateTask = function(tid,task){
      console.log('doUpdateTask '+tid)

      console.log(task)
     $ionicLoading.show({template:"Updating Task..."})
      var cback = function(error){
          if (error)
            console.log('update error',error)
          $ionicLoading.hide()
          $scope.closeModal() //chiudo la finestra modale
      }
      Activities.updateTask($scope.task.key,angular.copy($scope.task),cback) /* angular aggiunge campi
       di servizio agli oggetti in ng-repeat che non vengono accettati da firebase, quindi li rimuovo con angular.copy*/
  }


  $scope.doDelete = function(tid){
  task = Utilities.retrieveTask(tid,Activities.getVisualizedTasks())
                                                          $ionicLoading.show({template:'Deleting task...'})
                                                          var task =
                                                          Activities.deleteTask(task.key,function(res){
                                                              $ionicLoading.hide()
                                                              if (res) Utilities.notify('spiacente, qualcosa è andata male')
                                                              else {
                                                                Utilities.notify('il task è stato cancellato')
                                                                //ricarico la lista dei task
                                                                var cbackTasks = function(data){
                                                                                  //activities.setTasks(data) // setto i task in activities
                                                                                  activities.setRawTasks(data)
                                                                                  $ionicLoading.hide();// chiudo la rotella del caricamento task
                                                                                  var filter = function(task){
                                                                                    return task.lastTime == $scope.day || task.nextTime == $scope.day
                                                                                  }
                                                                                  $scope.activities = activities.getFilteredTasks(filter)
                                                                                }
                                                                activities.getAllTasks(cbackTasks)
                                                                $scope.activities = Activities.getTasksList()
                                                              }
                                                          })

                                                      }
/*verifica che il task sia stato eseguito in giornata
 @parameter task il task da controllare
 @return true se task.lastTime == today*/
 $scope.justDone = function(task){
   var today = new Date
   //formatto la data
   today = Utilities.formatDate(today,true);
   return task.lastTime == today
 }
  $scope.updateTask = function(tid,activities){/*refactored giuseppe 20151020 elimino il side effect dovuto
   a $scope.activities che puo cambiare con i controller*/
      activities = activities ||$scope.activities
     $scope.task = Utilities.retrieveTask(tid,activities) //  recupero il task da modificare e lo metto nello scope perchè sia visibile al popup
     console.log("updating task")
     $scope.action = "Update" // imposto il testo del pulsante nella finestra modale
     //imposto il popup
     $ionicModal.fromTemplateUrl('templates/taskPopup.html', {
                                                               scope: $scope,
                                                               animation: 'slide-in-up'
                                                             }).then(function(modal) {
                                                             console.log('setting modal',modal)
                                                               $scope.modal = modal;
                                                               $scope.openModal = function() {
                                                                $scope.modal.show();
                                                               };
                                                               $scope.closeModal = function() {
                                                                  $scope.modal.hide();
                                                               };
                                                               $scope.openModal()
                                                             });



     $scope.doAction = function(){
         $scope.doUpdateTask(tid,$scope.task)
         console.log('nota '+$scope.task.nota)
     }
     //$scope.openModal();

  }
                                                    $scope.taskDone = function (id){
                                                        $ionicLoading.show({template:'Updating Task'})
                                                        var task = Utilities.retrieveTask(id,Activities.getVisualizedTasks());
                                                        task.nextTime =  Utilities.formatDate(Utilities.addDays(new Date(),Activities.getDays(task.rep)))
                                                        task.rep += 1
                                                        task.history.push(Utilities.formatDate(new Date()))
                                                                    var callback = function(){
                                                                        $ionicLoading.hide()
                                                                        Utilities.notify("next time on "+ task.nextTime)
                                                                    }
                                                        Activities.updateTask(task.key,task,callback)
                                                    }


                                                var showLogin = function(){
                                                  $scope.validateUser = function(){
                                                  $scope.closeModal()
                                                  User.validateUser($scope.user.email,$scope.user.password,loginCback)
                                                  }

                                                  //$scope.openModal()
                                                }
                                                var showPopup= function(){

                                                var myPopup = $ionicPopup.show({
                                                                                                     template:'<p> username</p> <input type="text" ng_model="user.email"> '+
                                                                                                      '<p>password</p><input type="password" ng-model="user.password" >'+
                                                                                                      '<ion-checkbox ng-model="user.storeCredentials">Remenber Credentials</ion-checkbox>'
                                                                                                          ,
                                                                                                          title: 'inserisci  mail e password ',
                                                                                                          subTitle: 'oppure registrati',
                                                                                                          scope: $scope,
                                                                                                          buttons: [{text:'login',type: 'button-positive'},{text:'signup'}]
                                                                                                     })
                                                                                                     myPopup.then(function(){myPopup.close()
                                                                                                     //console.log($scope.user.email,$scope.user.password)
                                                                                                     User.validateUser($scope.user.email,$scope.user.password,loginCback)
                                                                                                     })



                                                }
                                                if (User.isLogged()){
                                                  console.log('utente loggato')

                                                  $scope.activities = Activities.getTasksList()
                                                }
                                                	else{// utente non loggato
                                                 if(/*Utilities.counter('loginPopup')==0*/true)
                                                 {
                                                 console.log('refresh')
                                                     $scope.user = {}
                                                     //recupero i valori memorizzati in locale
                                                     $scope.user.email = Utilities.getLocalValue('email')
                                                     $scope.user.password= Utilities.getLocalValue('password')
                                                     $scope.user.storeCredentials = (Utilities.getLocalValue('storeCredentials',false)=='true') //getLocalValue ritorna stringhe
                                                     //console.debug($scope.user)
                                                     var loginCback = function(error,authData){
                                                      if (error) {
                                                                    user.setLogged(false)
                                                                    if (error.code == 'INVALID_EMAIL') {
                                                                      Utilities.notify('Invalid Email Address');
                                                                    } else if (error.code == 'INVALID_PASSWORD') {
                                                                      Utilities.notify('Invalid Password');
                                                                    } else if (error.code == 'INVALID_USER') {
                                                                      Utilities.notify('Invalid User');
                                                                    } else {
                                                                      Utilities.notify('Oops something went wrong. Please try again later');
                                                                    }
                                                                  }
                                                      else{// login ok
                                                        console.log("Authenticated successfully with payload:", authData);
                                                            User.setUser($scope.user.email, $scope.user.password).setLogged(true)
                                                        if($scope.user.storeCredentials){
                                                            Utilities.setLocalValue('email',$scope.user.email);
                                                            Utilities.setLocalValue('password',$scope.user.password)//TODO encript password
                                                            Utilities.setLocalValue('storeCredentials',true)
                                                            console.log(authData.uid)
                                                          }
                                                          else
                                                              Utilities.setLocalValue('storeCredentials',false)
                                                              User.setUid(authData.uid).setProvider(authData.provider).setGravatar(authData.password.profileImageURL)
                                                              $rootScope.effige = authData.password.profileImageURL
                                                          console.log('carico la lista dei tasks')
                                                          var taskCback = function(data){
                                                            var filter = function(task){

                                                              return task.lastTime == $scope.day || task.nextTime == $scope.day
                                                            }
                                                            Activities.setRawTasks(data) // memorizzo l'oggetto ritornato da firebase per successivi riusi dagli altri stati
                                                            $scope.activities =  Activities.getFilteredTasks(filter) //Activities.get( data,filter)
                                                            Activities.setVisualizedTasks($scope.activities)
                                                            console.log(' acquisita la lista  dei task ')
                                                            $ionicLoading.hide() //nascondo il modal
                                                           }
                                                           $ionicLoading.show({template:'loading task...'})
                                                           Activities.getAllTasks(taskCback) // carico i tasksdal back-end
                                                     }
                                                 }
                                                     //if(Utilities.counter('loginPopup')==0)
                                                     //showPopup()
                                                     showLogin()
                                                	}
                                                	}
}])
