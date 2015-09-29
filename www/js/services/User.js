angular.module('StudyWod.services')
.service('User', ['Utility', function (Utilities) {

			var baseUrl = 'https://studywod.firebaseio.com//';
			var auth = Utilities.getAuth();
			this.user = {};
			this.user.token = '';
			this.user.name = "";
			this.user.provider = "";
			var user = this.user; // da usare in quelle funzioni che non sono in this

			this.createUser = function (email, password, cback) {
				this.user = {};
				this.user.token = '';
				this.user.uid = null;
				this.user.email = email;
				this.user.password = password;
				//var auth = $firebaseAuth(authRef);
				if (!email || !password) {
					Utilities.notify("Inserisci sia un'indirizzo email che una password");
					return false;
				}
				Utilities.show('Please wait.. Registering');

				auth.createUser({
					email : this.user.email,
					password : this.user.password
				}, cback);
			}
			this.getLogName = function () {
				return this.user.name
			}
			this.setToken = function (token) {
				this.user.token = token;
				return this
			}

			this.getMail = function () {
				return this.user.email;
			}

			this.getToken = function () {
				return this.user.token;
			}

			this.getPassword = function () {
				return this.user.password;
			}
			this.setUserName = function (name) {
				this.user.name = name;
				console.log("setting username: " + name);
				return this
			}

			this.setProvider = function (provider) {
				this.user.provider = provider;
				console.log("setting provider: " + provider);
				return this
			}
			this.setGravatar = function (gravatar) {
				this.user.gravatar = gravatar;
				console.log(" setted gravatar: " + gravatar)
				return this
			}

			this.getGravatar = function () {
				return this.user.gravatar
			}

			this.setUid = function (uid) {
				this.user.uid = uid;
				console.log("setting uid: " + uid);
				return this
			}
			this.getUid = function () {
				return this.user.uid
			}

			this.setLogged = function (logged) {
				this.user.logged = logged
				return this
			}

			this.isLogged = function () {
				return this.user.logged
			}

			this.getUserName = function () {
				return this.user.name
			}
			this.setUser = function (email, password) {
				this.user.email = email;
				this.user.password = password;
				return this
			}
			// here we will just simulate this with an isNewUser boolean
			var isNewUser = true;
			// find a suitable name based on the meta info given by each provider
			var getName = function (authData) {
				switch (authData.provider) {
				case 'password':
					return authData.password.email.replace(/@.*/, '');
				case 'twitter':
					return authData.twitter.displayName;
				case 'facebook':
					return authData.facebook.displayName;
				}
			}
			this.getName = getName;

			function authDataCallback(authData) {
				if (authData) {
					auth.child("users").child(authData.uid).once("value", function (utente) {
						newUser = utente.val() || { // se l'utente è già presente lo riscrivo uguale
							provider : authData.provider,
							name : getName(authData)
						}
						if (authData) {
							// save the user's profile into the database so we can list users,
							// use them in Security and Firebase Rules, and show profiles
							auth.child("users").child(authData.uid).set(newUser);
						}
					})

				} else {
					console.log("User is logged out"); //TODO popup
				}
			}

			this.validateUser = function (mail, password, cback) {
				auth.onAuth(authDataCallback);
				auth.authWithPassword({
					email : mail,
					password : password
				}, cback)

			}
		}

	])
