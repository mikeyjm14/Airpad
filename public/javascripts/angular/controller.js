AirPadApp.constant('config', {
    appName: 'My App',
    appVersion: 2.0,
    apiUrl: 'http://www.google.com?api'
});

var notepad = function($scope, $state, $stateParams, favorites, currUser, $anchorScroll, $location) {
	$scope.currUser = currUser;
	
	$scope.IsLoggedIn = function() {
		if (currUser.username === null) {
			$state.go("login");
		}
	};
	
	$scope.GoToAddNote = function() {
        $state.go("addnote");
    };
	
	$scope.GoToViewNotes = function() {
        $state.go("viewnotes");
    };
	
	$scope.GoToViewDeletedNotes = function() {
        $state.go("viewdeletednotes");
    };
	
	$scope.GoToViewFavoriteNotes = function() {
        $state.go("viewfavnotes");
    };
	
	$scope.GoToHome = function() {
        $state.go("home");
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
	
	$scope.optionsTitleView = {
        styleWithSpan: true,
        focus: true,
        airMode: true,
        toolbar: [
            ['view', ['codeview']]
        ]
    };
};

var viewnotes = function($scope, $state, favorites, notes, deletedNotes, currUser, $anchorScroll, $location) {
	$scope.listOfNotes = notes;
	$scope.currUser = currUser.name;
	
	$scope.IsLoggedIn = function() {
		if (currUser.username === null) {
			$state.go("login");
		}
	};
	
	$scope.scrollTo = function(id) {
      var newHash = id;
      if ($location.hash() !== newHash) {
        $location.hash(id);
      } else {
        $anchorScroll();
      }
    };
	
	$scope.GoToAddNote = function() {
        $state.go("addnote");
    };
	
	$scope.GoToEditNote = function(note) {
		if (note === null || note === undefined) {
			return;
		}
		
        $state.go("editnote", {noteID: note.id});
		
		var currNote = getNoteByID(note.id, $scope.listOfNotes.notes);
		if (currNote !== null) {
			$scope.editform = {
				id: currNote.id,
				title: currNote.title,
				body: currNote.content,
				tags: currNote.categories
			};
			
			$scope.noInvalidIDError = true;
		} else {
			$scope.noInvalidIDError = false;
		}
    };

    $scope.GoToNote = function(note) {
		if (note === null || note === undefined) {
			return;
		}
		
        $state.go("viewnote", {noteID: note.id});
		$scope.currNote = getNoteByID(note.id, $scope.listOfNotes.notes);
    };
	
	$scope.AddNoteToFavorites = function(note) {
		var tempNote = getNoteByID(note.id, $scope.listOfNotes.notes);
		
		if (tempNote === null || tempNote === undefined) {
			return;
		}
		
		var existingNote = getNoteByID(tempNote.id, favorites.favs);
		if (existingNote !== null) {
			return;
		}
		
		favorites.favs.unshift(
			{
				id: tempNote.id,
				title: tempNote.title
			}
		);
		
		note.favored = true;
	};
	
	$scope.DeleteNote = function(note) {
		if (note === null || note === undefined) {
			return;
		}
		
		var noteFavIndex = getNoteIndexByID(note.id, favorites.favs);
		if (noteFavIndex !== -1) {
			removeNote(noteFavIndex, favorites.favs, 1);
		}
		
		var noteMainIndex = getNoteIndexByID(note.id, $scope.listOfNotes.notes);
		if (noteMainIndex !== -1) {
			removeNote(noteMainIndex, notes.notes, 1);
		} else {
			return;
		}
		
		deletedNotes.notes.push(note);
		console.log(deletedNotes);
	};
};

var viewnote = function($scope, $state, $stateParams, notes, currUser) {
	if (notes === null) {
		return;
	}
	
	$scope.IsLoggedIn = function() {
		if (currUser.username === null) {
			$state.go("login");
		}
	};
	
	$scope.currNote = getNoteByID($stateParams.noteID, notes.notes);
	
	$scope.InjectContent = function(elementID, note) {
		if (note === null) {
			return;
		}
		
		injectHTML(elementID, note.content);
	};
	
	$scope.ToViewNoteState = function() {
		var noteID = $stateParams.noteID;
		var note = getNoteByID(noteID, notes.notes);
		
		$scope.GoToNote(note);
	};

    $scope.GoToNote = function(note) {
		if (note === null || note === undefined) {
			return;
		}
		$scope.currNote = getNoteByID(note.id, notes.notes);
        $state.go("viewnote", {noteID: note.id});
    };
};

var viewfavoritenotes = function($scope, $state, $anchorScroll, $location, favorites, notes, currUser) {
	$scope.listOfFavorites = favorites;
	$scope.currUser = currUser.name;
	
	$scope.IsLoggedIn = function() {
		if (currUser.username === null) {
			$state.go("login");
		}
	};
	
	$scope.scrollTo = function(id) {
      var newHash = id;
      if ($location.hash() !== newHash) {
        $location.hash(id);
      } else {
        $anchorScroll();
      }
    };
	
	$scope.GoToViewNotes = function() {
        $state.go("viewnotes");
    };
	
	$scope.GoToNote = function(note) {
		if (note === null || note === undefined) {
			return;
		}
		
        $state.go("viewnote", {noteID: note.id});
		$scope.currNote = getNoteByID(note.id, notes.notes);
    };
	
	$scope.RemoveNoteFromFavorites = function(note) {
		var noteIndex = getNoteIndexByID(note.id, $scope.listOfFavorites.favs);
		if (noteIndex === -1) {
			return;
		}
		
		var realNote = getNoteByID(note.id, notes.notes);
		realNote.favored = false;
		
		$scope.listOfFavorites.favs.splice(noteIndex, 1);
	};
};

var addnote = function($scope, $state, notes, currUser) {
	$scope.IsLoggedIn = function() {
		if (currUser.username === null) {
			$state.go("login");
		}
	};
	
	$scope.noError = true;
	
	$scope.form = {
		title: "",
		body: "",
		tags: []
	};
	
	$scope.ToViewNoteState = function() {
		var noteID = $stateParams.noteID;
		var note = getNoteByID(noteID, $scope.listOfNotes.notes);
		
		$scope.GoToNote(note);
	};
	
	$scope.GoToViewNotes = function() {
        $state.go("viewnotes");
    };
	
	$scope.ClearValues = function () {
        $scope.form = null;

        $scope.form = {
            title: "",
            body: "",
			tags: []
        };
		
		$scope.noError = true;
    };
	
	$scope.AddNote = function() {
		if ($scope.form.title.length > 0 && $scope.form.body.length > 0) {
			$scope.noError = true;
			notes.notes.unshift(
				{
					title: $scope.form.title,
					content: $scope.form.body,
					creator: currUser.name,
					creationDate: theDate(1),
					recentEditDate: theDate(0),
					categories: ["none yet"],
					id: randomString(10),
					favored: false
				}
			);
			$scope.ClearValues();
			currUser.amountOfNotes = notes.notes.length;
			$scope.GoToViewNotes();
		} else {
			$scope.noError = false;
		}
	};
};

var editnote = function($scope, $state, $stateParams, notes, currUser) {
	$scope.IsLoggedIn = function() {
		if (currUser.username === null) {
			$state.go("login");
		}
	};
	
	$scope.noError = true;
	$scope.noInvalidIDError = true;
	
	$scope.editform = {
		id: "",
		title: "",
		body: "",
		tags: []
	};
	
	$scope.ToEditNoteState = function() {
		var noteID = $stateParams.noteID;
		var note = getNoteByID(noteID, $scope.listOfNotes.notes);
		
		$scope.GoToEditNote(note);
	};
	
	$scope.TestNoteID = function() {
		var currNote = getNoteByID($stateParams.noteID, notes.notes);
		console.log($stateParams.noteID);
		if (currNote !== null) {
			$scope.editform = {
				id: currNote.id,
				title: currNote.title,
				body: currNote.content,
				tags: currNote.categories
			};
			
			$scope.noInvalidIDError = true;
		} else {
			$scope.noInvalidIDError = false;
		}
	}
	
	$scope.GoToViewNotes = function() {
        $state.go("viewnotes");
    };
	
	$scope.ClearEditValues = function () {
		var id = $scope.editform.id;
        $scope.editform = null;

        $scope.editform = {
			id: id,
			title: "",
			body: "",
			tags: []
		};
		
		$scope.noError = true;
    };
	
	$scope.UpdateNote = function() {
		if ($scope.editform.title.length > 0 && $scope.editform.body.length > 0) {
			$scope.noError = true;
			
			var noteIndex = getNoteIndexByID($scope.editform.id, notes.notes);
			
			notes.notes[noteIndex].title = $scope.editform.title;
			notes.notes[noteIndex].content = $scope.editform.body;
			notes.notes[noteIndex].recentEditDate = theDate(0);
			
			$scope.ClearEditValues();
			$scope.GoToViewNotes();
		} else {
			$scope.noError = false;
		}
	};
}

var viewdeletednotes = function($scope, $state, notes, deletedNotes, $anchorScroll, $location, currUser) {
	$scope.IsLoggedIn = function() {
		if (currUser.username === null) {
			$state.go("login");
		}
	};
	
	$scope.listOfDeletedNotes = deletedNotes;
	
	$scope.scrollTo = function(id) {
      var newHash = id;
      if ($location.hash() !== newHash) {
        $location.hash(id);
      } else {
        $anchorScroll();
      }
    };
	
	$scope.GoToViewNotes = function() {
        $state.go("viewnotes");
    };
	
	$scope.DeleteNoteForever = function(note) {	
		var noteIndex = getNoteIndexByID(note.id, $scope.listOfDeletedNotes.notes);
		if (noteIndex !== -1) {
			removeNote(noteIndex, $scope.listOfDeletedNotes.notes, 1);
		}
	};
	
	$scope.RestoreNote = function(note) {
		var noteIndex = getNoteIndexByID(note.id, $scope.listOfDeletedNotes.notes);
		if (noteIndex !== -1) {
			removeNote(noteIndex, $scope.listOfDeletedNotes.notes, 1);
		}
		
		notes.notes.unshift(note);
		$scope.GoToViewNotes();
	};
}

var profile = function($scope, $stateParams, $state, currUser, users) {
    var userID = $stateParams.userID;
	
	$scope.IsLoggedIn = function() {
		if (currUser.username === null) {
			$state.go("login");
		}
	};
	
    $scope.user = {
        name: "",
        username: "",
        email: "",
        about: "",
        dateSignUp: "",
        amountOfReviews: "",
        amountOfEdits: ""
    };
	
	$scope.IsLoggedIn = function() {
		if (currUser.username === null) {
			$state.go("login");
		}
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

var loginSignup = function($scope, $state, currUser, users) {
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
	'FavoriteNotes',
	'CurrUser',
	'$anchorScroll',
	'$location',
    notepad
]);

AirPadApp.controller('ViewNotes', [
	'$scope',
    '$state',
	'FavoriteNotes',
	'Notes',
	'DeletedNotes',
	'CurrUser',
	'$anchorScroll',
	'$location',
    viewnotes
]);

AirPadApp.controller('ViewNote', [
	'$scope',
    '$state',
	'$stateParams',
	'Notes',
	'CurrUser',
    viewnote
]);

AirPadApp.controller('ViewFavoriteNotes', [
	'$scope',
    '$state',
	'$anchorScroll',
	'$location',
	'FavoriteNotes',
	'Notes',
	'CurrUser',
    viewfavoritenotes
]);

AirPadApp.controller('AddNote', [
	'$scope',
    '$state',
	'Notes',
	'CurrUser',
    addnote
]);

AirPadApp.controller('EditNote', [
	'$scope',
    '$state',
	'$stateParams',
	'Notes',
	'CurrUser',
    editnote
]);

AirPadApp.controller('ViewDeletedNotes', [
	'$scope',
    '$state',
	'Notes',
	'DeletedNotes',
	'$anchorScroll',
	'$location',
	'CurrUser',
    viewdeletednotes
]);

AirPadApp.controller('LoginController', [
    '$scope',
    '$state',
	'CurrUser',
    'Users',
    loginSignup
]);

AirPadApp.controller('ProfileController', [
    '$scope',
    '$stateParams',
    '$state',
	'CurrUser',
    'Users',
    profile
]);