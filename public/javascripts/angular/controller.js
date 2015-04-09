var notepad = function($scope, $state, $stateParams) {
	$scope.currUser = "John Doe";

    $scope.currNote = null;

    $scope.notes = "John Doe";
	
	$scope.form = {
		title: "",
		body: ""
	};
	
	$scope.listOfFavorites = {
		favs: []
	}
	
	$scope.noError = true;
	
	$scope.listOfNotes = {
        notes: [
            {
                title: "Note 1",
                content: "Content",
                creator: $scope.currUser,
                creationDate: theDate(1),
                recentEditDate: theDate(0),
                categories: ["none yet", "none added yet", "none to add yet"],
                id: randomString(10)
            },
            {
                title: "Note 2",
                content: "<ul><li>Content</li></ul>",
                creator: $scope.currUser,
                creationDate: theDate(1),
                recentEditDate: theDate(0),
                categories: ["none yet"],
                id: randomString(10)
            },
            {
                title: "Note 3",
                content: "<h3>Content</h3>",
                creator: $scope.currUser,
                creationDate: theDate(1),
                recentEditDate: theDate(0),
                categories: ["none yet"],
                id: randomString(10)
            },
            {
                title: "Note 4",
                content: "<h1>Content</h1>",
                creator: $scope.currUser,
                creationDate: theDate(1),
                recentEditDate: theDate(0),
                categories: ["none yet"],
                id: randomString(10)
            },
            {
                title: "Note 5",
                content: "<pre>Content</pre>",
                creator: $scope.currUser,
                creationDate: theDate(1),
                recentEditDate: theDate(0),
                categories: ["none yet"],
                id: randomString(10)
            }
        ]
    };

    $scope.GoToNote = function(note) {
		if (note === null || note === undefined) {
			console.log("Null note");
			return;
		}
		
        $state.go("viewnote", {noteID: note.id});
		$scope.currNote = getNoteByID(note.id, $scope.listOfNotes);
    };
	
	$scope.GoToViewNotes = function() {
		console.log("Currently does nothing.");
        $state.go("viewnotes");
    };
	
	$scope.GoToViewFavoriteNotes = function() {
		console.log("Currently does nothing.");
        $state.go("viewfavnotes");
    };
	
	$scope.ShareNote = function(note) {
		console.log("Currently does nothing.");
	};
	
    $scope.optionsTitle = {
        styleWithSpan: true,
        focus: true,
        airMode: true,
        toolbar: [
            ['edit',['undo','redo']],
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            ['fontface', ['fontname']],
            ['textsize', ['fontsize']],
            ['fontclr', ['color']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link','hr']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
        ]
    };
	
	$scope.AddNoteToFavorites = function(note) {
		var tempNote = getNoteByID(note.id, $scope.listOfNotes.notes);
		
		if (tempNote === null || tempNote === undefined) {
			return;
		}
		
		$scope.listOfFavorites.favs.push(
			{
				noteID: tempNote.id,
				noteTitle: tempNote.title
			}
		);
	};
	
	$scope.clearValues = function () {
        console.log($scope.form.title + " : " + $scope.form.body);
        $scope.form = null;

        $scope.form = {
            title: "",
            body: ""
        };
		
		$scope.noError = true;
    };
	
	$scope.addNote = function() {
		if ($scope.form.title.length > 0 && $scope.form.body.length > 0) {
			$scope.noError = true;
			$scope.listOfNotes.notes.push(
				{
					title: $scope.form.title,
					content: $scope.form.body,
					creator: $scope.currUser,
					creationDate: theDate(1),
					recentEditDate: theDate(0),
					categories: ["none yet"],
					id: randomString(10)
				}
			);
			$scope.clearValues();
		}
	}
};

var profile = function($scope, $stateParams, $state, user, users) {
    var userID = $stateParams.userID;

    $scope.user = {
        name: "",
        username: "",
        email: "",
        about: "",
        dateSignUp: "",
        amountOfReviews: "",
        amountOfEdits: ""
    };

    $scope.toNoUserFoundState = function () {
        $state.go('profile.noUser');
        $scope.message = "Please log in to view your profile.";
    };

    $scope.toViewState = function () {
        $state.go('profile.view');
    };

    $scope.toEditState = function () {
        $state.go('profile.edit');
    };

    var getUser = function(index) {
        if (users.users.length === 0
            || userID === ''
            || userID === null
            || userID === undefined) {
            return;
        }

        var currUser = users.users[index];

        $scope.user = {
            name: currUser.name,
            username: currUser.username,
            email: currUser.email,
            about: currUser.about,
            dateSignUp: currUser.dateSignedUp,
            amountOfReviews: currUser.amountOfReviews,
            amountOfEdits: currUser.amountOfEdits
        };
    };

    var updateUser = function() {
        var index = findUserByID(userID, users.users);
        users.users.splice(index, 1);

        user.username = $scope.user.username;
        user.email = $scope.user.email;
        user.about = $scope.user.about;

        users.users.push(user);
    };

    $scope.isLoggedIn = function() {
        var id = user.id;
        var profileID = userID;
        return id == profileID && ((id != null && id != '') && (profileID != null && profileID != ''))
    };

    $scope.isValidUser = function () {
        if (users.users.length === 0 || userID === null || userID === '' || userID === undefined) {
            userID = user.id;
        }

        var index = findUserByID(userID, users.users);

        if (index === -1) {
            $scope.toNoUserFoundState();
        } else {
            $scope.toViewState();
            getUser(index);
        }
    };

    $scope.submitChanges = function() {
        if ($scope.user.username == ''
            || $scope.user.username == null
            || $scope.user.about === ''
            || $scope.user.about === null
            || $scope.user.email === ''
            || $scope.user.email === null) {
            $scope.errorMessage = "Please fill out all required fields.";
            return;
        }

        $scope.errorMessage = "";

        updateUser();

        $scope.toViewState();
    };
};

var loginSignup = function($scope, $state, user, users) {
    $scope.incomingUser = {
        username: "",
        password: ""
    };

    $scope.newUserInfo = {
        firstName: "",
        lastName: "",
        username:"",
        email: "",
        password: "",
        passwordAgain: ""
    };

    var showIfLoggedIn = function () {
        if (user.username !== ""
            && user.username !== null) {
            $scope.loginText = "Log Out";
        }
        else {
            $scope.loginText = "Log In";
        }
    };

    $scope.toLoginState = function() {
        $state.go('login.login');
        showIfLoggedIn();
        $scope.text = "Login";
        $scope.errorMessage = "";
    };

    $scope.toSignupState = function() {
        $state.go('login.signUp');
        $scope.text = "Sign Up";
        $scope.errorMessage = "";
    };

    $scope.SignUp = function() {
        var completed = true;
        $scope.errorMessage = "Please enter data into the required field ";

        if ($scope.newUserInfo.firstName === '' || $scope.newUserInfo.firstName === null) {
            $scope.errorMessage += "FIRST NAME ";
            completed = false;
        }

        if ($scope.newUserInfo.lastName === '' || $scope.newUserInfo.lastName === null) {
            $scope.errorMessage += "LAST NAME ";
            completed = false;
        }

        if ($scope.newUserInfo.username === '' || $scope.newUserInfo.username === null) {
            $scope.errorMessage += "USERNAME ";
            completed = false;
        }

        if ($scope.newUserInfo.email === '' || $scope.newUserInfo.email === null) {
            $scope.errorMessage += "EMAIL ";
        }

        if ($scope.newUserInfo.password === '' || $scope.newUserInfo.password === null) {
            $scope.errorMessage += "PASSWORD";
            completed = false;
        }

        if (!completed) {
            return;
        }

        if ($scope.newUserInfo.passwordAgain === ''
            || $scope.newUserInfo.passwordAgain === null
            || $scope.newUserInfo.passwordAgain != $scope.newUserInfo.password) {
            $scope.errorMessage = "Please enter same value in both PASSWORD and PASSWORD_AGAIN fields";
            return;
        }

        if (findUserByUsername($scope.newUserInfo.username, users.users) !== -1) {
            $scope.errorMessage = "The USERNAME has been taken.";
            return;
        }

        if (findUserByEmail($scope.newUserInfo.email, users.users) !== -1) {
            $scope.errorMessage = "The EMAIL is already registered for an account.";
            return;
        }

        $scope.errorMessage = "";

        users.users.push({
            id: randomString(5) + "",
            name: $scope.newUserInfo.firstName + " " + $scope.newUserInfo.lastName,
            username: $scope.newUserInfo.username,
            email: $scope.newUserInfo.email,
            password: $scope.newUserInfo.password,
            about: "New member",
            dateSignedUp: time(0),
            amountOfReviews: 0,
            amountOfEdits: 0
        });

        $scope.newUserInfo = null;

        $scope.newUserInfo = {
            firstName: "",
            lastName: "",
            username:"",
            email: "",
            password: "",
            passwordAgain: ""
        };

        $scope.toLoginState();
        $scope.errorMessage = "Log in with new account.";
    };

    $scope.Login = function() {
        if ($scope.incomingUser.username === ''
            || $scope.incomingUser.username === null
            || $scope.incomingUser.password === ''
            || $scope.incomingUser.password === null) {
            $scope.errorMessage = "Please fill in all required fields.";
            return;
        }

        if ($scope.incomingUser.username === user.username
            || $scope.incomingUser.password === user.password) {
            $scope.errorMessage = "Already logged in.";
            return;
        }

        var index = findUserByCredentials($scope.incomingUser.username, $scope.incomingUser.password, users.users);

        if (index === -1) {
            $scope.errorMessage = "Wrong email/username or password.";
            return;
        }

        $scope.errorMessage = "";

        user.id = users.users[index].id;
        user.name = users.users[index].name;
        user.username = users.users[index].username;
        user.email = users.users[index].email;
        user.password = users.users[index].password;
        user.about = users.users[index].about;
        user.dateSignedUp = users.users[index].dateSignedUp;
        user.amountOfEdits = users.users[index].amountOfEdits;
        user.amountOfReviews = users.users[index].amountOfReviews;

        $state.go('profile', {userID: user.id});
    };

    $scope.logout = function () {
        if (!$scope.isLoggedOut()) {
            return;
        }

        user.id = '';
        user.name = '';
        user.username = '';
        user.email = '';
        user.password = '';
        user.about = '';
        user.dateSignedUp = '';
        user.amountOfEdits = '';
        user.amountOfReviews = '';

        $scope.toLoginState();
    };

    $scope.isLoggedOut = function () {
        return (user.username !== '' && user.username !== null);
    };
};

AirPadApp.controller('NotePad', [
	'$scope',
    '$state',
    '$stateParams',
    notepad
]);

AirPadApp.controller('LoginController', [
    '$scope',
    '$state',
    'User',
    'Users',
    loginSignup
]);

AirPadApp.controller('ProfileController', [
    '$scope',
    '$stateParams',
    '$state',
    'User',
    'Users',
    profile
]);