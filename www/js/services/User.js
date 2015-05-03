angular.module('StudyWod.services')
.service('User',['$firebaseAuth','Utility', function($firebaseAuth,Utilities, $firebase){
			
            	var  baseUrl = 'https://studywod.firebaseio.com//';
	            var auth = new Firebase(baseUrl);

			this.createUser = function(mail,password){
    			this.email = mail;
    			this.password = password;
	            //var auth = $firebaseAuth(authRef);
	            if (!this.email || !password) {
	                Utilities.notify("Please enter valid credentials");
	                return false;
            }
            Utilities.show('Please wait.. Registering');

            auth.createUser({email:this.email, password:this.password}, function(error, user) {
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
            });
        }
        this.validateUser = function(mail,password){
        	auth.authWithPassword({email:mail,password:password}, function(error,authData){
        		

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
   					 this.email = mail;
   					 this.password = password;

        		};


        		
        
    	})
    }
}


    		
    															
        
		
	]
)
	
