angular.module('StudyWod.services', []).factory('User',function(){
	
	var user ={email:"",
			password:""};
	var setUser = function(email,password){
		user.email = email;
		user.password = password;

	}
	return {'user':user,'setUser':setUser};
});