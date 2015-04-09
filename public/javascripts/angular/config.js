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

        // Login/Sign Up
        .state('login', {
            url: '/login',
            templateUrl: '/loginView/userLogin.html',
            controller: 'LoginController'
        })

        // Login
        .state('login.login', {
            url: '^/userLogin',
            templateUrl: '/userLogin.html',
            controller: 'LoginController'
        })

        // Sign Up
        .state('login.signUp', {
            url: '^/signUp',
            templateUrl: '/userSignup.html',
            controller: 'LoginController'
        })

        // User Profile
        .state('profile', {
            url: '/profile/:userID',
            templateUrl: '/userProfile.html',
            controller: 'ProfileController'
        })

        .state('profile.redirect', {
            url: '/redirect',
            templateUrl: '/public/htmls/userProfileViews/redirect.html'
        })

        .state('profile.view', {
            url: '/view',
            templateUrl: '/public/htmls/userProfileViews/viewUserProfile.html'
        })

        .state('profile.edit', {
            url: '/edit',
            templateUrl: '/public/htmls/userProfileViews/editUserProfile.html'
        })

        .state('profile.noUser', {
            url: '/no-user',
            templateUrl: '/public/htmls/userProfileViews/userNotFound.html'
        })
});