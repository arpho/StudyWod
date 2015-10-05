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
                                                                    var today = new Date()
                                                                    $scope.subtitle = "Work of Today  " + Utilities.formatDate(today,true);
                                                console.log('wodctrl')

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
                                                var showLogin = function(){
                                                  $scope.validateUser = function(){
                                                  console.debug($scope.user)
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
                                                      /* apro il popup solo una volta
                                                      TODO eliminare il casino delle ripetizioni e sto schifo di counter*/
                                                      var n =0;
                                                 if(/*Utilities.counter('loginPopup')==0*/true)
                                                 {
                                                 console.log('refresh')
                                                     $scope.user = {}
                                                     //recupero i valori memorizzati in locale
                                                     $scope.user.email = Utilities.getLocalValue('email')
                                                     $scope.user.password= Utilities.getLocalValue('password')
                                                     $scope.user.storeCredentials = (Utilities.getLocalValue('storeCredentials',false)=='true') //getLocalValue ritorna stringhe
                                                     console.debug($scope.user)
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
                                                      else{
                                                        console.log("Authenticated successfully with payload:", authData);
                                                            User.setUser($scope.user.email, $scope.user.password).setLogged(true)
                                                        if($scope.user.storeCredentials){
                                                            Utilities.setLocalValue('email',$scope.user.email);
                                                            Utilities.setLocalValue('password',$scope.user.password)//TODO encript password
                                                            Utilities.setLocalValue('storeCredentials',true)
                                                            User.setUid(authData.uid).setProvider(authData.provider).setGravatar(authData.password.profileImageURL)
                                                          }
                                                          else
                                                              Utilities.setLocalValue('storeCredentials',false)
                                                          console.log('carico la lista dei tasks')
                                                          var taskCback = function(data){
                                                            $scope.activities =data.val()// Activities.normalizeTasks( data)
                                                            console.log(' acquisita la lista  dei task ')
                                                            for(var key in $scope.activities){
                                                            console.log(key,$scope.activities[key])}
                                                            $ionicLoading.hide()
                                                           }
                                                           $ionicLoading.show({template:'loading task...'})
                                                           Activities.getAllTasks(taskCback)
                                                     }
                                                 }
                                                     //if(Utilities.counter('loginPopup')==0)
                                                     //showPopup()
                                                     showLogin()
                                                	}
                                                	else{
                                                	n =1 +n
                                                	console.log('controller refreshed'),n}
                                                	}
}])
