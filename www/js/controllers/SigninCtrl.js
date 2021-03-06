angular.module('StudyWod.controllers')
.controller('SignInController', [
    '$scope', '$ionicLoading', 'Utility', 'User', '$rootScope', '$state'
                                                ,'Activities', function ($scope, $ionicLoading, Utilities, user, $rootScope, $state, activities) {
      //location.html5Mode(true)
      // check session
      // $rootScope.checkSession();
      $scope.user = {}
      $scope.user.email = Utilities.getValue('email')
        if ($scope.user.email)
          $scope.user.rememberCredentials = true;
        else
          $scope.user.rememberCredentials = false;
        $scope.user.password = Utilities.getValue('password')
        $scope.validateUser = function () {
          var email = $scope.user.email;
          var password = $scope.user.password;
          if (!email || !password) { // verifico che siano state inserite le crednz<iali d'accesso
            Utilities.notify("Please enter valid credentials");
            return false;
          } else {
            $ionicLoading.show({
              template : 'Login in Corso...'
            })
          }
  /* callback del login*/
          var cback = function (error, authData) {
          //recupero dati utente
            $rootScope.isUserLogged = user.isLogged()
            $rootScope.userName = user.getUserName()
            $rootScope.gravatar = user.getGravatar()
            //chiudo la rotella
            $ionicLoading.hide();
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
            else
            {
                console.log("Authenticated successfully with payload:", authData);
                this.email = email;
                this.password = password;
                if ($scope.user.rememberCredentials) // memorizzo le credenziali per login successivi
                {
                  Utilities.setValue('email', email)
                  Utilities.setValue('password', password)
                }
                //setto i parametri dell'utente
                user.setToken(authData.token);
                user.setLogged(true)
                user.setUser(email, password);
                user.setUid(authData.uid);
                user.setProvider(authData.provider);
                user.setGravatar(authData.password.profileImageURL);
                $rootScope.effige = authData.password.profileImageURL
                $ionicLoading.hide();// chiudo la  rotella del login

                var cbackTasks = function(data){
                  activities.setTasks(data) // setto i task in activities
                  $ionicLoading.hide();// chiudo la rotella del caricamento task
                }
               // $ionicLoading.show({template : 'caricamento  attività dal server...'} )
                activities.getAllTasks(cbackTasks) // recupero i task dal server di firebase
                user.setUser(email, password);
                user.setUid(authData.uid);
                user.setProvider(authData.provider);
                user.setGravatar(authData.password.profileImageURL);
                $rootScope.effige = authData.password.profileImageURL
                  user.setUserName(user.getName(authData));
                // alert('signing '+user.getMail()+' up  with '+user.getPassword());
                Utilities.notify("benvenuto  " + user.getUserName())
                $rootScope.isUserLogged = user.isLogged
                  $rootScope.gravatar = user.getGravatar()
                  var nextState = Utilities.getPreviousState() || 'wod'
                  //$state.go(nextState);
          }
        };


          user.validateUser(email, password, cback)

        }
    }
  ])
