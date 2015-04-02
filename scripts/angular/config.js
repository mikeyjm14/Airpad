AirPadApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/home');

    $urlRouterProvider.when('/note/:userID', '/note/:userID');/*/redirect*/

    $stateProvider

        // Home
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html'
        })

        // Add Note
        .state('addnote', {
            url: '/add_note',
            templateUrl: 'views/addnote.html'
        })

        // View Note
        .state('viewnote', {
            url: '/view_note/:noteID',
            templateUrl: 'views/viewnote.html'
        })

        // View Notes
        .state('viewnotes', {
            url: '/view_notes',
            templateUrl: 'views/viewnotes.html'
        })

        // View Notes
        .state('profile', {
            url: '/profile',
            templateUrl: 'views/profile.html'
        });
});