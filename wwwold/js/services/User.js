angular.module('StudyWod.services')
.service('User',['$firebaseAuth','Utility', function($firebaseAuth,Utilities){
			
            	var  baseUrl = 'https://studywod.firebaseio.com//';
	            var auth = Utilities.getAuth();
	            this.user = {};
    			this.user.token ='';

			this.createUser = function(email,password,cback){
    			this.user = {};
    			this.user.token ='';
    			this.user.email = email;
    			this.user.password = password;
	            //var auth = $firebaseAuth(authRef);
	            if (!this.email || !password) {
	                Utilities.notify("Please enter valid credentials");
	                return false;
            }
            Utilities.show('Please wait.. Registering');

            auth.createUser({email:this.email, password:this.password}, cback);
        }

			this.setToken = function(token){
                    this.user.token = token;
               }

              this.getMail = function(){
              	return this.user.email;
              }

              this.getToken = function(){
              		return this.user.token;
              }

              this.getPassword = function(){
				return this.user.password;
              }
              this.setUser = function(email,password){
              	this.user.email = email;
              	this.user.password = password;
              }

	        this.validateUser = function(mail,password,cback){
	        	auth.authWithPassword({email:mail,password:password}, cback)
	    	}
}


    		
    															
        
		
	]
)
	
