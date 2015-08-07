angular.module('StudyWod.controllers')
    .controller('SignInController', [
        '$scope','$ionicLoading'
		,'Utility'
		, 'User'
		,'$rootScope'
        ,function($scope,$ionicLoading,Utilities, user,$rootScope) {
            // check session
           // $rootScope.checkSession();
		   console.log($ionicLoading)
            $scope.validateUser = function() {
				$ionicLoading.show({template:'Loging in...'})
                var email = this.user.email;
                var password = this.user.password;
                if (!email || !password) {
                    $rootScope.notify("Please enter valid credentials");
                    return false;
                }

                var cback = function(error,authData){
					$rootScope.isUserLogged = user.isLogged()
					$rootScope.userName = user.getUserName()
					$rootScope.gravatar = user.getGravatar()
					$ionicLoading.hide();
                if (error) {
					 user.setLogged(false)
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'INVALID_PASSWORD') {
                        $rootScope.notify('Invalid Password');
                    } else if (error.code == 'INVALID_USER') {
                        $rootScope.notify('Invalid User');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                 } 
                 else {
                     console.log("Authenticated successfully with payload:", authData);
                     this.email = email;
                     this.password = password;
					 //setto i parametri dell'utente
                     user.setToken(authData.token);
					 user.setLogged(true)
                     user.setUser(email,password);
					 user.setUid (authData.uid);
					 user.setProvider(authData.provider);
					 user.setGravatar(authData.password.profileImageURL);
					 user.setUserName(user.getName(authData));
                     // alert('signing '+user.getMail()+' up  with '+user.getPassword());
						Utilities.notify("benvenuto  "+user.getUserName())

                };


                
        
        }
                user.validateUser(email,password,cback)
                
            }
        }
    ])