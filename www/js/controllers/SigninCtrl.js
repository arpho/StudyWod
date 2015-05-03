angular.module('StudyWod.controllers')
    .controller('SignInController', [
        '$scope', 'User', '$firebaseAuth', '$window',
        function($scope, user,  $window) {
            // check session
           // $rootScope.checkSession();
            $scope.validateUser = function() {

                var email = this.user.email;
                var password = this.user.password;
                if (!email || !password) {
                    $rootScope.notify("Please enter valid credentials");
                    return false;
                }
                user.validateUser(email,password)
                
            }
        }
    ])