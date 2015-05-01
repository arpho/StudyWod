angular.module('StudyWod.services').factory('User',['Utility', function($firebaseAuth, $firebase){
	
	var user ={email:"",
			password:""},
			baseUrl = 'hhttps://studywod.firebaseio.com//',
authRef = new Firebase(baseUrl),
//var auth = $firebaseAuth(authRef),
setUser = function(email,password){
		user.email = email;
		user.password = password;

},
createUser = function() {
            var email = user.email;
	            var password = user.password;
	            if (!email || !password) {
	                $rootScope.notify("Please enter valid credentials");
	                return false;
            }
            Utilities.show('Please wait.. Registering');

            auth.$createUser(email, password, function(error, user) {
                if (!error) {
                    Utilities.hide();
                    $window.location.href = ('#/bucket/list');
                } else {
                    Utilities.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        Utilities.notify('Invalid Email Address');
                    } else if (error.code == 'EMAIL_TAKEN') {
                        Utilities.notify('Email Address already taken');
                    } else {
                        Utilities.notify('Oops something went wrong. Please try again later');
                    }
                }
            });
        },
        hw= ' hello world to ';//+user.email;
	return {'getUser':user,'setUser':setUser,'createUser':createUser,'hw':hw};
}]);

