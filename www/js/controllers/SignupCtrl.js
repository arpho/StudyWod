angular.module('StudyWod.controllers')
.controller('SignUpController', [
		'$scope', 'User', '$window', 'Utility',
		function ($scope, user, $window, Utilities) {
			$scope.user = {
				email : "",
				password : ""
			};
			$scope.createUser = function () {
				Utilities.show('registering new user...')
				var email = this.user.email;

				var cback = function (error, loggedUser) {
					if (!error) {
						Utilities.hide();
						user.setUid(loggedUser.uid)
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
				var password = this.user.password,
				email = this.user.email;
				user.createUser(email, password, cback);
			}
		}
	])
