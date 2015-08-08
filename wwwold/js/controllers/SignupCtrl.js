angular.module('StudyWod.controllers')
.controller('SignUpController', [
    '$scope', 'User', '$window',
    function($scope, user,  $window) {
        $scope.user = {
            email: "",
            password: ""
        };
        $scope.createUser = function() {
            var email = this.user.email;

            var cback = function(error, user) {
                if (!error) {
                    Utilities.hide();
                    //$window.location.href = ('#/bucket/list');
                } else {
                    Utilities.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        Utilities.notify('Invalid Email Address');
                        console.log('Invalid Email Address')
                    } else if (error.code == 'EMAIL_TAKEN') {
                        Utilities.notify('Email Address already taken');
                        console.log('Email Address already taken');
                    } else {
                        Utilities.notify('Oops something went wrong. Please try again later');
                    }
                }
            }
            var password = this.user.password;
            user.createUser(email,password,cback);
            alert('signing up '+user.getMail()+' up  with '+user.getPassword());
        }
    }
])