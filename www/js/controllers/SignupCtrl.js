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
            console.log('createUser');
            //alert(user.sayHello('popiu'));
            var password = this.user.password;
            user.setUser(email,password);
            //$user.setUser(this.user.email,this.user.password)
            alert('signing '+user.user+' up  with '+user.password);
            //console.log(user.sayHello('hello'));
        }
    }
])