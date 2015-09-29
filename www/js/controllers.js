angular.module('StudyWod.controllers', ['StudyWod.services'])

.controller('DashCtrl', function($scope) {
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('SignUpCtrl', [
    '$scope', '$rootScope', '$firebaseAuth', '$window',
    function($scope, $rootScope, $firebaseAuth, $window) {
        $scope.user = {
            email: "",
            password: ""
        };
        $scope.createUser = function() {
            var email = this.user.email;
            var password = this.user.password;
            if (!email || !password) {
                $rootScope.notify("Please enter valid credentials");
                return false;
            }
            $rootScope.show('Please wait.. Registering');

            $rootScope.auth.$createUser(email, password, function(error, user) {
                if (!error) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $window.location.href = ('#/bucket/list');
                } else {
                    $rootScope.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'EMAIL_TAKEN') {
                        $rootScope.notify('Email Address already taken');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                }
            });
        }
    }
]).controller('SignInCtrl', [
        '$scope'
		, '$rootScope'
		, '$firebaseAuth'
		, '$window'
		,function($scope, $rootScope, $firebaseAuth, $window) {
            // check session
           // $rootScope.checkSession();
            $scope.validateUser = function() {
                $rootScope.show('Please wait.. Authenticating');
                var email = this.user.email;
                var password = this.user.password;
                if (!email || !password) {
                    $rootScope.notify("Please enter valid credentials");
                    return false;
                }

                $rootScope.auth.$login('password', {
                    email: email,
                    password: password
                }).then(function(user) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $window.location.href = ('#/bucket/list');
                }, function(error) {
                    $rootScope.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'INVALID_PASSWORD') {
                        $rootScope.notify('Invalid Password');
                    } else if (error.code == 'INVALID_USER') {
                        $rootScope.notify('Invalid User');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                });
            }
        }
    ])
	.controller("ContentController",['$scope','$ionicSideMenuDelegate',function($scope,$ionicSideMenuDelegate){
		$scope.toggleLeft = function(){
			$ionicSideMenuDelegate.toggleLeft();
		}
	}])
	.controller('NavCtrl',[
							'$scope'
							,'$ionicSideMenuDelegate'
							,'$ionicModal'
							,'Activities'
							,'Utility'
							,'$ionicLoading'
							, '$state'
							, function($scope, $ionicSideMenuDelegate,$ionicModal,Activities,Utilities,$ionicLoading,$state) {


		$scope.openModal = function() {
		$scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };
		$scope.doCreateTask = function(task){
      $ionicLoading.show({template:'Creating new task...'})
      var cback = function(){
          $ionicLoading.hide()
		  $scope.closeModal()
      }

      Activities.createTask(task,cback)
  }
	  $scope.$on('$stateChangeStart',function(){
		  Utilities.setPreviousState($state.current.name)
	  })
	  //$scope.myAvatar = User.getGravatar()
	  $scope.$on('$stateChangeSuccess',function(){
		  if ($state.current.parent =='workout') $scope.showPlus= true
		  else $scope.showPlus = false
	  })
	  $scope.newTask = function(){
      $scope.task = {}
      $scope.task.history = [Utilities.formatDate(new Date())]
      $scope.task.lastTime = Utilities.formatDate(new Date())
      $scope.task.nextTime = Utilities.formatDate(Utilities.addDays(new Date(),1))
      $scope.task.rep =0;
      $scope.action ='Crea'

      $scope.doAction = function(){
          $scope.doCreateTask($scope.task)
      }
     $scope.openModal();

  }

	  $scope.showMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	  };
	  $scope.showRightMenu = function () {
		$ionicSideMenuDelegate.toggleRight();
	  }
	}])
