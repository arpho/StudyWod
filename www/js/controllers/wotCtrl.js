angular.module('StudyWod.controllers')
.controller('WotController',['$scope'
                                                ,'Utility'
                                                ,'Activities'
                                                ,'$ionicLoading'
                                                ,'$ionicModal'
                                                ,'User'
                                                , '$log'
                                                ,'$filter'
												,'$state'
												,'$ionicSideMenuDelegate'
                                                ,function($scope,Utilities,Activities,$ionicLoading,$ionicModal,User,log,$state,$menuDelegate,$filter){


  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.showMenu = function() {
	  console.log('menu')
    $menuDelegate.toggleLeft();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
	$scope.titolo = "Wot";

var today = new Date()
	var tomorrow = Utilities.addDays(today,1)
	$scope.subtitle = "Work of Tomorrow  " + Utilities.formatDate(tomorrow,true);
	$scope.day = Utilities.formatDate(tomorrow,true);
        //definisco il filtro da usare nella lista dei task
  $scope.filter2Use ='wotFilter'
	var getTasks = function(){
		$ionicLoading.show({template:'Loading Wot...'})
		console.log('retrieving  tasks')
		var cback = function(data){
			console.log("cback gettasts")
			//instanzio la lista delle attivita
			$scope.activities = data.val()

			console.log(data)
			$ionicLoading.hide()
		}
		var today = new Date()
		var tomorrow = Utilities.addDays(today,1)
		Activities.getTasks(Utilities.formatDate(tomorrow),cback)
	}
	console.log('user is logged ',User.isLogged())
	if (User.isLogged()){
	var taskCback = function(data){
     $scope.activities = data.val()// Activities.normalizeTasks( data)
     console.log(' acquisita la lista  dei task ')
     $ionicLoading.hide()
  }
  $ionicLoading.show({template:'loading task...'})
  Activities.getAllTasks(taskCback)
    //$scope.activities = Activities.getTasksList()
  }
	else{
	 //Utilities.setPreviousState('wot')
	 //$state.go('signin')
	}
}])
