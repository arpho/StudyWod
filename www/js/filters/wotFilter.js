angular.module('StudyWod.filters',[]).filter('wotFilter',[function(){
/*
@param Array di valori passato al filtro da angularjs in questo caso Tasks
@param String valore di riferimento data nel formato dd/MM/yyyy
*/
	return function(items,day){
	var filtered = []
	angular.forEach(items,function(item){
	  if (item.nextTime ==day )
	  filtered.push(item)
	})
		return filtered
	}
}])
