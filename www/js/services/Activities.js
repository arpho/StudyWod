angular.module('StudyWod.services')
.factory('Activities', [
		'Utility', 'User', function (Utilities, User) {
			var ref = Utilities.getAuth();
			var activities = {}
			 activities.rawTasks = {};
			 /* questa variabile conterrà l'oggetto data ritornato da firebase, per evitare di scaricare la lista ad ogni
			  passaggio a wot e all finchè l'utente è autenticato

			  @param oggetto data ritornato da firebase
			  */

activities.setRawTasks = function(tasks){
  this.rawTasks = tasks
  return this
}
/* ritorna la lista dei tasks filtrata e normalizzata

@param  Function(task) funzione che ritorna i tasks  che rispettano certe condizioni
@return [Task]
*/
activities.getFilteredTasks = function (filter){
return this.normalizeTasks(this.rawTasks, filter)
}
/*ritorna l'oggetto data di firebase memorizzato in rawTasks
*/
activities.getRawTasks = function(){
  return this.rawTasks}
			/* aggiorna un task
			@param  string uid dell'oggetto
			@param Task : nuovo oggetto task
			@param funzione di callback che riceverà l'oggetto error
			 */
			activities.updateTask = function (uid, task, cback) {

				ref.child('tasks').child(User.getUid()).child(uid).set(task, cback)

			}

			/*
			interroga il server di firebase
			@param string  data d'interesse nel formato  "3/8/2015"
			@param String campo su cui firebase filtrerà, default nextTime
			@param  funzione di callback, per gestire la risposta del server
			 */
			activities.getTasks = function (day, cback,field) {
				queryField = field ||'nextTime'
				if (User.getUid()) {
					ref.child('tasks').child(User.getUid()).orderByChild(queryField).equalTo(day).on("value", cback, function (errorObject) {
						console.log("The read failed: " + errorObject.code);
					})

				} else
					console.log('utente non loggato')

			}

			/* cancella un task
			@param string id del task
			@param function funzione di calback*/
			activities.deleteTask = function(tid,cback){
				ref.child('tasks').child(User.getUid()).child(tid).remove(cback);
			}
/*
setta la lista dei tasks
@param oggetto che rappresenta i task ritornato dalla chiamata a firebase
@return null
*/
activities.setTasks = function(data){
activities.tasks = []
/*ogni task ha una funzione done*/
for ( var activity in  data.val()){
                                     var task = data.val()[activity]
                                     task.id = activity
                                     task.done = function()
                                     {
                                       today = new  Date()
                                       task.lastTime = Utilities.formatDate(today)
                                       next = Utilities.addDays(today,Activities.getDays(task,task.rep)); // data prossima ripetizione
                                       task.nextTime = Utilities.formatDate(next)
                                     }
                                     activities.tasks.push(task)
                                   }
}
/*
ritorna la lista dei task caricati al login
@deprecated
@return [tasks]
*/
activities.getFullTasksList = function(cback){
}
activities.getTasksList = function(){
console.log('getting tasks list in activities ')
var tasks = {}
for (var t in activities.tasks)


tasks[t] = activities.tasks[t]
return tasks
}

			/*
			interroga il server di firebase, recupera tutti i task
			@param  funzione di callback, per gestire la risposta del server
			 */
			activities.getAllTasks = function (cback) {
				if (User.isLogged()) {
					ref.child('tasks').child(User.getUid()).orderByChild('lastTime').on("value", cback, function (errorObject) {
						console.log("The read failed: " + errorObject.code);
					})

				} else
					console.log('utente non loggato')

			}
			/*
			ritorna l'intervallo di tempo dopo il quale l'attività sarà rischedulata
			@param int numero di ripetizioni eseguite
			@return int intervallo in giorni
			 */
			activities.getDays = function (rep) {
				intervals = {}
				intervals[0] = 1
					intervals[1] = 3
					intervals[2] = 7
					intervals[3] = 14
					intervals[4] = 30
					out = intervals[rep] || 30 // dopo la 5° ripetizione l'intervallo  è sempre 30 giorni
					return out

			}

			/* i filtri di angularjs non gestiscono gli oggetti quindi converto la risposta di firebase in un array
			e aggiungo a tutti gli oggetti il campo chiave per non peredere l'identificativo di firebase
      			quindi ne faccio una copia
      			@parameter data da firebase
      			@parameter funzione che valuta la visibilità del task
      			@return oggetto copia di data.val()*/
activities.normalizeTasks = function(data,filter){
           		var tasks = []
           		for(var key in data.val()){
           		  var task = data.val()[key]
           		  task.key = key
           		  if (filter(task))
           		  tasks.push(task)
           		}
           		return tasks;
           		}
			activities.createTask = function (task, cback) {
				ref.child("tasks").child(User.getUid()).push(task, cback);
			}

			activities.updateTask = function (tid, task, cback) {
				ref.child("tasks").child(User.getUid()).child(tid).update(angular.copy(task), cback)
			}
			activities.pushDemoActivity = function () {
				console.log("pushing new demo task")
				var activity = {
					'activity' : 'test activity',
					'rep' : 0,
					'lastTime' : Utilities.formatDate(new Date()),
					'history' : [Utilities.formatDate(new Date())],
					'nextTime' : Utilities.formatDate(Utilities.addDays(new Date(), 1))
				}
				ref.child("tasks").child(User.getUid()).push(activity);
			}
			return activities;
		}
	])
