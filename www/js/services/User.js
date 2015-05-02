angular.module('StudyWod.services').service('User',['Utility', function($firebaseAuth, $firebase){
			this.sayHello = function(text){
        		return "Service says Hello " + text ;
    		};
    		this.setUser = function(user,password){
    			this.user = user;
    			this.password = password;
    		this.createUser = function() {
            var email = this.user;
	            var password = this.password;
	            if (!email || !password) {
	                Utilities.notify("Please enter valid credentials");
	                return false;
            }
            Utilities.show('Please wait.. Registering');

            auth.$createUser(this.user, this.password, function(error, user) {
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
        }
    		};
		}
	]
)
	/*
var user ={email:"",
			password:""},
			baseUrl = 'hhttps://studywod.firebaseio.com//',
	authRef = new Firebase(baseUrl),
	//var auth = $firebaseAuth(authRef),
	setUser = function(email,password){
			user.email = email;
			user.password = password;

	};
	return { log: function(msg){
				alert(msg)
			}
	};
}]);
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
        },*/
        /*hw= function(){ 
        	return  'hello world to ' + email;
        };*/
	//return {getUser:user,setUser:setUser,/*'createUser':createUser,*/hw:hw};
//});

