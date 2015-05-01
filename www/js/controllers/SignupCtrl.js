angular.module('StudyWod.controllers')
.controller('SignUpController', [
    '$scope', 'User', '$window',
    function($scope, $rootScope,$user,  $window) {
        $scope.user = {
            email: "",
            password: ""
        };
        $scope.createUser = function() {
            var email = this.user.email;
            var password = this.user.password;
            //$user.setUser(this.user.email,this.user.password)
            alert('signing '+email+' up  with '+password+$user.hw);
        }
    }
])