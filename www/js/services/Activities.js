angular.module('StudyWod.services')
.factory('Activities', [
		'Utility', 'User',function (Utilities, User) {
			var ref = Utilities.getAuth();
			var activities = {};

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
			@param  funzione di callback, per gestire la risposta del server
			 */
			activities.getTasks = function (day, cback) {
				console.log('gettasks')
				if (User.getUid()) {
					ref.child('tasks').child(User.getUid()).orderByChild('nextTime').equalTo(day).on("value", cback, function (errorObject) {
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
			
			
			activities.createTask = function (task, cback) {
				ref.child("tasks").child(User.getUid()).push(task, cback);
			}

			activities.updateTask = function (tid, task, cback) {
				ref.child("tasks").child(User.getUid()).child(tid).update(task, cback)
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
