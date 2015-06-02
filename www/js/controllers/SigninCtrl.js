angular.module('StudyWod.controllers')
    .controller('SignInController', [
        '$scope','Utility', 'User'
        ,function($scope,Utilities, user) {
            // check session
           // $rootScope.checkSession();
           console.log(Utilities);
            $scope.validateUser = function() {

                var email = this.user.email;
                var password = this.user.password;
                if (!email || !password) {
                    $rootScope.notify("Please enter valid credentials");
                    return false;
                }

                var cback = function(error,authData){
                

                if (error) {
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
                     user.setToken(authData.token);
                     user.setUser(email,password);
                     alert('signing '+user.getMail()+' up  with '+user.getPassword());
                     Utilities.notify("tada!")

                };


                
        
        }
                user.validateUser(email,password,cback)
                
            }
        }
    ])