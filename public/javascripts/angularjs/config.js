AirPadApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/home');

    $urlRouterProvider.when('/note/:userID', '/note/:userID');/*/redirect*/

    $stateProvider

        // Home
        .state('home', {
            url: '/home',
            templateUrl: '../../../views/home.jade'
        })

        // Add Note
        .state('addnote', {
            url: '/add_note',
            templateUrl: '../../../views/addnote.jade'
        })

        // View Note
        .state('viewnote', {
            url: '/view_note/:noteID',
            templateUrl: '../../../views/viewnote.jade'
        })

        // View Notes
        .state('viewnotes', {
            url: '/view_notes',
            templateUrl: '../../../views/viewnotes.jade'
        })

        // View Notes
        .state('profile', {
            url: '/profile',
            templateUrl: '../../../views/profile.jade'
        });
});