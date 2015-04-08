AirPadApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/home');

    $urlRouterProvider.when('/note/:userID', '/note/:userID');/*/redirect*/

    $stateProvider

        // Home
        .state('home', {
            url: '/home',
            templateUrl: 'home.jade'
        })

        // Add Note
        .state('addnote', {
            url: '/add_note',
            templateUrl: 'addnote.jade'
        })

        // View Note
        .state('viewnote', {
            url: '/view_note/:noteID',
            templateUrl: 'viewnote.jade'
        })

        // View Notes
        .state('viewnotes', {
            url: '/view_notes',
            templateUrl: 'viewnotes.jade'
        })

        // View Notes
        .state('profile', {
            url: '/profile',
            templateUrl: 'profile.jade'
        });
});