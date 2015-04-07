angular.module('StudyWod.controllers', [])
    .controller('SignInCtrl', [
        '$scope', '$rootScope', '$firebaseAuth', '$window',
        function($scope, $rootScope, $firebaseAuth, $window) {
            // check session
            alert('signin')
            $rootScope.checkSession();
            $scope.validateUser = function() {
                $rootScope.show('Please wait.. Authenticating');
                var email = this.user.email;
                var password = this.user.password;
                if (!email || !password) {
                    $rootScope.notify("Please enter valid credentials");
                    return false;
                }

                $rootScope.auth.$login('password', {
                    email: email,
                    password: password
                }).then(function(user) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $window.location.href = ('#/bucket/list');
                }, function(error) {
                    $rootScope.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'INVALID_PASSWORD') {
                        $rootScope.notify('Invalid Password');
                    } else if (error.code == 'INVALID_USER') {
                        $rootScope.notify('Invalid User');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                });
            }
        }
    ])