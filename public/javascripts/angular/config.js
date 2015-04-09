AirPadApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/home');

    $urlRouterProvider.when('/note/:userID', '/note/:userID');/*/redirect*/
	$urlRouterProvider.when('/view_note/:noteID', '/view_note/:noteID');/*/redirect*/

    $stateProvider

        // Home
        .state('home', {
            url: '/home',
            templateUrl: '/home.html'
        })

        // Add Note
        .state('addnote', {
            url: '/add_note',
            templateUrl: '/addnote.html'
        })

        // View Note
        .state('viewnote', {
            url: '/view_note/:noteID',
            templateUrl: '/viewnote.html'
        })

        // View Notes
        .state('viewnotes', {
            url: '/view_notes',
            templateUrl: '/viewnotes.html'
        })
		
		// View Favorite Notes
        .state('viewfavnotes', {
            url: '/view_fav_notes',
            templateUrl: '/viewfavorites.html'
        })

        // View Profile
        .state('profile', {
            url: '/profile',
            templateUrl: '/profile.html'
        });
});