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
                                                ,$ionicActionSheet){
                                                                    $scope.titolo = "Wod";
                                                                    var today = new Date()
                                                                    $scope.subtitle = "Work of Today  " + Utilities.formatDate(today,true);
                                                console.log('wodctrl')
                                                if (User.isLogged()){
                                                  console.log('utente loggato')

                                                  $scope.activities = Activities.getTasksList()
                                                }
                                                	else{// utente non loggato
                                                      /* apro il popup solo una volta
                                                      TODO eliminare il casino delle ripetizioni e sto schifo di counter*/
                                                 if(Utilities.counter('loginPopup')==0)
                                                 {
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
                                                        if($scope.user.storeCredentials){
                                                            Utilities.setLocalValue('email',$scope.user.email);
                                                            Utilities.setLocalValue('password',$scope.user.password)//TODO encript password
                                                            Utilities.setLocalValue('storeCredentials',true)
                                                            User.setUser($scope.user.email, $scope.user.password).setLogged(true)
                                                            .setUid(authData.uid).setProvider(authData.provider).setGravatar(authData.password.profileImageURL)
                                                          }
                                                          else
                                                              Utilities.setLocalValue('storeCredentials',false)
                                                          console.log('carico la lista dei login')
                                                          var taskCback = function(data){
                                                            $scope.activities = data.val()
                                                            console.log(' acquisita la lista  dei task')
                                                            for(var key in $scope.activities){
                                                            console.log(key,$scope.activities[key])}
                                                           }
                                                           Activities.getAllTasks(taskCback)
                                                     }
                                                 }

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
                                                	}
}])
