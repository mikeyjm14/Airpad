var notepad = function ($scope, $state, currUser) {
	$scope.SetName = function () {
		return currUser.username;
	};
	
	var setUserID = function () {
		return currUser.id;
	};
	
	$scope.LoggedIn = function () {
		return (currUser.id !== null);
	};
	
	$scope.GoToLogin = function () {
		$state.go('login');
    };
	
	$scope.GoToProfile = function () {
        $state.go('profile', {userID: currUser.id});
    };
};

var home = function ($scope, $state, $stateParams, currUser, $anchorScroll, $location) {
	$scope.currUser = currUser;
	
	$scope.IsLoggedIn = function () {
		if (currUser.id === null) {
			$state.go("login");
		}
	};
	
	$scope.LoggedIn = function () {
		return (currUser.id !== null);
	};
	
	$scope.GoToAddNote = function () {
        $state.go("addnote");
    };
	
	$scope.GoToViewNotes = function () {
        $state.go("viewnotes");
    };
	
	$scope.GoToViewDeletedNotes = function () {
        $state.go("viewdeletednotes");
    };
	
	$scope.GoToViewFavoriteNotes = function () {
        $state.go("viewfavnotes");
    };
	
	$scope.GoToHome = function () {
        $state.go("home");
    };
	
    $scope.optionsTitle = {
        styleWithSpan: true,
        focus: true,
        airMode: true,
        toolbar: [
            ['edit', ['undo', 'redo']],
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            ['fontface', ['fontname']],
            ['textsize', ['fontsize']],
            ['fontclr', ['color']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link', 'hr']],
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

var viewnotes = function ($scope, $state, currUser, $anchorScroll, $location) {
	$scope.listOfNotes = {
		notes: currUser.notes
	};
	
	$scope.sortOptions = [
		{id: 0, name: "Title Ascending"},
		{id: 1, name: "Title Descending"},
		{id: 2, name: "Date Created Ascending"},
		{id: 3, name: "Date Created Descending"},
		{id: 4, name: "Date Edited Ascending"},
		{id: 5, name: "Date Edited Descending"},
		{id: 6, name: "Favorited Ascending"},
		{id: 7, name: "Favorited Descending"}
	];
	
	$scope.selectedValue = null;
	$scope.predicate = "";
	$scope.reverse = false;
	
	var setSort = function (predicate, reversed) {
		$scope.predicate = predicate;
		$scope.reverse = reversed;
	};
	
	$scope.changedValue = function (value) {
		$scope.selectedValue = value;
		
		if ($scope.selectedValue === null) {
			setSort("", false);
			return;
		}
		
		switch ($scope.selectedValue.id) {
		case 0:
			setSort("title", false);
			break;
		case 1:
			setSort("title", true);
			break;
		case 2:
			setSort("creationDate", false);
			break;
		case 3:
			setSort("creationDate", true);
			break;
		case 4:
			setSort("recentEditDate", false);
			break;
		case 5:
			setSort("recentEditDate", true);
			break;
		case 6:
			setSort("favored", true);
			break;
		case 7:
			setSort("favored", false);
			break;
		}
	};
	
	$scope.currUser = currUser.name;
	
	$scope.IsLoggedIn = function () {
		if (currUser.id === null) {
			$state.go("login");
		}
	};
	
	$scope.scrollTo = function (id) {
		var newHash = id;
		if ($location.hash() !== newHash) {
			$location.hash(id);
		} else {
			$anchorScroll();
		}
	};
	
	$scope.GoToAddNote = function () {
        $state.go("addnote");
    };
	
	$scope.GoToEditNote = function (note) {
		if (note === null || note === undefined) {
			return;
		}
		
        $state.go("editnote", {noteID: note.id});
		
		var currNote = getNoteByID(note.id, currUser.notes);
		if (currNote !== null) {
			$scope.editform = {
				id: currNote.id,
				title: currNote.title,
				body: currNote.content
			};
			
			$scope.noInvalidIDError = true;
			currNote.recentEditDate = theDate(1);
		} else {
			$scope.noInvalidIDError = false;
		}
    };

    $scope.GoToNote = function (note) {
		if (note === null || note === undefined) {
			return;
		}
		
        $state.go("viewnote", {noteID: note.id});
		$scope.currNote = getNoteByID(note.id, currUser.notes);
    };
	
	$scope.AddNoteToFavorites = function (note) {
		var tempNote = getNoteByID(note.id, currUser.notes);
		
		if (tempNote === null || tempNote === undefined) {
			return;
		}
		
		var existingNote = getNoteByID(tempNote.id, currUser.favs);
		if (existingNote !== null) {
			return;
		}
		
		currUser.favs.unshift(
			{
				id: tempNote.id,
				title: tempNote.title
			}
		);
		
		note.favored = true;
		currUser.amountFavorited = currUser.favs.length;
	};
	
	$scope.DeleteNote = function (note) {
		if (note === null || note === undefined) {
			return;
		}
		
		if (getNoteIndexByID(note.id, currUser.favs) !== -1) {
			removeNote(noteFavIndex, currUser.favs, 1);
		}
		
		if (getNoteIndexByID(note.id, currUser.notes) !== -1) {
			removeNote(noteMainIndex, currUser.notes, 1);
		} else {
			return;
		}
		
		currUser.deleted.push(note);
		currUser.amountDeleted = currUser.deleted.length;
	};
};

var viewnote = function ($scope, $state, $stateParams, currUser) {
	if (currUser.notes === null) {
		return;
	}
	
	$scope.IsLoggedIn = function () {
		if (currUser.id === null) {
			$state.go("login");
		}
	};
	
	$scope.currNote = getNoteByID($stateParams.noteID, currUser.notes);
	
	$scope.InjectContent = function (elementID, note) {
		if (note === null) {
			return;
		}
		
		injectHTML(elementID, note.content);
	};
	
	$scope.ToViewNoteState = function () {
		var note = getNoteByID($stateParams.noteID, currUser.notes);
		
		$scope.GoToNote(note);
	};

    $scope.GoToNote = function (note) {
		if (note === null || note === undefined) {
			return;
		}
		$scope.currNote = getNoteByID(note.id, currUser.notes);
        $state.go("viewnote", {noteID: note.id});
    };
};

var viewfavoritenotes = function ($scope, $state, $anchorScroll, $location, currUser) {
	$scope.listOfFavorites = {
		favs: currUser.favs
	};
	
	$scope.currUser = currUser.name;
	
	$scope.IsLoggedIn = function () {
		if (currUser.id === null) {
			$state.go("login");
		}
	};
	
	$scope.scrollTo = function (id) {
        if ($location.hash() !== id) {
            $location.hash(id);
        } else {
            $anchorScroll();
        }
    };
	
	$scope.GoToViewNotes = function () {
        $state.go("viewnotes");
    };
	
	$scope.GoToNote = function (note) {
		if (note === null || note === undefined) {
			return;
		}
		
        $state.go("viewnote", {noteID: note.id});
		$scope.currNote = getNoteByID(note.id, currUser.notes);
    };
	
	$scope.RemoveNoteFromFavorites = function (note) {
		var noteIndex = getNoteIndexByID(note.id, currUser.favs);
		if (noteIndex === -1) {
			return;
		}
		
		var realNote = getNoteByID(note.id, currUser.notes);
		realNote.favored = false;
		
		currUser.favs.splice(noteIndex, 1);
		currUser.amountFavorited = currUser.favs.length;
	};
};

var addnote = function ($scope, $state, currUser) {
	$scope.IsLoggedIn = function () {
		if (currUser.id === null) {
			$state.go("login");
		}
	};
	
	$scope.noError = true;
	
	$scope.form = {
		title: "",
		body: ""
	};
	
	$scope.GoToViewNotes = function () {
        $state.go("viewnotes");
    };
	
	$scope.ClearValues = function () {
        $scope.form = null;

        $scope.form = {
            title: "",
            body: ""
        };
		
		$scope.noError = true;
    };
	
	$scope.AddNote = function () {
		if ($scope.form.title.length > 0 && $scope.form.body.length > 0) {
			$scope.noError = true;
			currUser.notes.unshift(
				{
					title: $scope.form.title,
					content: $scope.form.body,
					creator: currUser.name,
					creationDate: theDate(1),
					recentEditDate: theDate(0),
					id: randomString(10),
					favored: false
				}
			);
			$scope.ClearValues();
			currUser.amountOfNotes = currUser.notes.length;
			$scope.GoToViewNotes();
		} else {
			$scope.noError = false;
		}
	};
};

var editnote = function ($scope, $state, $stateParams, currUser) {
	$scope.IsLoggedIn = function () {
		if (currUser.username === null) {
			$state.go("login");
		}
	};
	
	$scope.noError = true;
	$scope.noInvalidIDError = true;
	
	$scope.editform = {
		id: "",
		title: "",
		body: ""
	};
	
	$scope.ToEditNoteState = function () {
		var noteID = $stateParams.noteID;
		var note = getNoteByID(noteID, currUser.notes);
		
		$scope.GoToEditNote(note);
	};
	
	$scope.TestNoteID = function () {
		var currNote = getNoteByID($stateParams.noteID, currUser.notes);
		if (currNote !== null) {
			$scope.editform = {
				id: currNote.id,
				title: currNote.title,
				body: currNote.content
			};
			
			$scope.noInvalidIDError = true;
		} else {
			$scope.noInvalidIDError = false;
		}
	};
	
	$scope.GoToViewNotes = function () {
        $state.go("viewnotes");
    };
	
	$scope.ClearEditValues = function () {
		var id = $scope.editform.id;
        $scope.editform = null;

        $scope.editform = {
			id: id,
			title: "",
			body: ""
		};
		
		$scope.noError = true;
    };
	
	$scope.UpdateNote = function () {
		if ($scope.editform.title.length > 0 && $scope.editform.body.length > 0) {
			$scope.noError = true;
			
			var noteIndex = getNoteIndexByID($scope.editform.id, currUser.notes);
			
			currUser.notes[noteIndex].title = $scope.editform.title;
			currUser.notes[noteIndex].content = $scope.editform.body;
			currUser.notes[noteIndex].recentEditDate = theDate(0);
			
			$scope.ClearEditValues();
			$scope.GoToViewNotes();
		} else {
			$scope.noError = false;
		}
	};
}

var viewdeletednotes = function ($scope, $state, $anchorScroll, $location, currUser) {
	$scope.IsLoggedIn = function () {
		if (currUser.username === null) {
			$state.go("login");
		}
	};
	
	$scope.listOfDeletedNotes = {
		notes: currUser.deleted
	};
	
	$scope.scrollTo = function (id) {
      var newHash = id;
      if ($location.hash() !== newHash) {
        $location.hash(id);
      } else {
        $anchorScroll();
      }
    };
	
	$scope.GoToViewNotes = function () {
        $state.go("viewnotes");
    };
	
	$scope.DeleteNoteForever = function (note) {
		var noteIndex = getNoteIndexByID(note.id, currUser.deleted);
		if (noteIndex === -1) {
			return;
		}
		
		removeNote(noteIndex, currUser.deleted, 1);
		currUser.amountDeleted = currUser.deleted.length;
	};
	
	$scope.RestoreNote = function (note) {
		var noteIndex = getNoteIndexByID(note.id, currUser.deleted);
		if (noteIndex !== -1) {
			removeNote(noteIndex, currUser.deleted, 1);
		}
		
		currUser.notes.unshift(note);
		currUser.amountOfNotes = currUser.notes.length;
		currUser.amountDeleted = currUser.deleted.length;
		$scope.GoToViewNotes();
	};
};

var profile = function ($scope, $stateParams, $state, currUser, users) {
	$scope.noInvalidIDError = true;
	$scope.user = null;
	
	$scope.IsLoggedIn = function () {
		if (currUser.id === null) {
			$state.go("login");
		}
	};
	
	$scope.GoToViewNotes = function () {
        $state.go("viewnotes");
    };
	
	$scope.GoToViewDeletedNotes = function () {
        $state.go("viewdeletednotes");
    };
	
	$scope.GoToViewFavoriteNotes = function () {
        $state.go("viewfavnotes");
    };

    $scope.toViewState = function () {
        $state.go('profile.view');
    };

    $scope.toEditState = function () {
        $state.go('profile.edit');
    };
	
	$scope.TestUserID = function () {
		if (users.users.length === 0 || currUser.id === null || currUser.id !== $stateParams.userID) {
			$scope.noInvalidIDError = false;
			return;
		}
		
		currUser.amountOfNotes = currUser.notes.length;
		currUser.amountFavorited = currUser.favs.length;
		currUser.amountDeleted = currUser.deleted.length;
		
		$scope.user = currUser;
		$scope.noInvalidIDError = true;
	};
};

var login = function ($scope, $state, currUser, initialUser, users) {
	$scope.errorMessage = "";
	
	$scope.IsLoggedOut = function () {
        return (currUser.id === null);
    };
	
	var setLoginTitle = function () {
		if($scope.IsLoggedOut()) {
			return "Log In";
		}
		
		return "Log Out";
	};
	
	$scope.text = setLoginTitle();
	
    $scope.incomingUser = {
        username: "",
        password: ""
    };

    $scope.toLoginState = function () {
        $scope.errorMessage = "";
		$state.go('login');
    };

    $scope.toSignupState = function () {
        $scope.errorMessage = "";
		$state.go('signup');
    };

    $scope.Login = function () {
        if ($scope.incomingUser.username === ''
                || $scope.incomingUser.username === null
                || $scope.incomingUser.password === ''
                || $scope.incomingUser.password === null) {
            $scope.errorMessage = "Please fill in all required fields.";
            return;
        }

        if ($scope.incomingUser.username === currUser.username
                || $scope.incomingUser.password === currUser.password) {
            $scope.errorMessage = "Already logged in.";
            return;
        }

        var index = findUserByCredentials($scope.incomingUser.username, $scope.incomingUser.password, users.users);

        if (index === -1) {
            $scope.errorMessage = "Wrong email/username or password.";
            return;
        }

        $scope.errorMessage = "";
		
		currUser.id = users.users[index].id;
        currUser.name = users.users[index].name;
        currUser.username = users.users[index].username;
        currUser.email = users.users[index].email;
        currUser.password = users.users[index].password;
        currUser.about = users.users[index].about;
        currUser.signupDate = users.users[index].signupDate;
        currUser.amountOfNotes = users.users[index].amountOfNotes;
		currUser.amountFavorited = users.users[index].amountFavorited;
		currUser.amountDeleted = users.users[index].amountDeleted;
		currUser.notes = users.users[index].notes;
		currUser.favs = users.users[index].favs;
		currUser.deleted = users.users[index].deleted;

        $state.go('home');
    };

    $scope.Logout = function () {
        if ($scope.IsLoggedOut()) {
            return;
        }
		
		currUser.id = null;
        currUser.name = null;
        currUser.username = null;
        currUser.email = null;
        currUser.password = null;
        currUser.about = null;
        currUser.signupDate = null;
        currUser.amountOfNotes = -1;
		currUser.amountFavorited = -1;
		currUser.amountDeleted = -1;
		currUser.notes = null;
		currUser.favs = null;
		currUser.deleted = null;
		
        $scope.toLoginState();
		
		$scope.text = setLoginTitle();
    };
};

var signup = function ($scope, $state, users) {
	$scope.errorMessage = "";

	$scope.newUserInfo = {
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		passwordAgain: ""
    };
	
    $scope.toLoginState = function () {
        $scope.errorMessage = "";
		$state.go('login');
    };

    $scope.toSignupState = function () {
        $scope.errorMessage = "";
		$state.go('signup');
    };

    $scope.SignUp = function () {
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
                || $scope.newUserInfo.passwordAgain !== $scope.newUserInfo.password) {
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
};

AirPadApp.controller('NotePad', [
	'$scope',
    '$state',
	'CurrUser',
    notepad
]);

AirPadApp.controller('Home', [
	'$scope',
    '$state',
    '$stateParams',
	'CurrUser',
	'$anchorScroll',
	'$location',
    home
]);

AirPadApp.controller('ViewNotes', [
	'$scope',
    '$state',
	'CurrUser',
	'$anchorScroll',
	'$location',
    viewnotes
]);

AirPadApp.controller('ViewNote', [
	'$scope',
    '$state',
	'$stateParams',
	'CurrUser',
    viewnote
]);

AirPadApp.controller('ViewFavoriteNotes', [
	'$scope',
    '$state',
	'$anchorScroll',
	'$location',
	'CurrUser',
    viewfavoritenotes
]);

AirPadApp.controller('AddNote', [
	'$scope',
    '$state',
	'CurrUser',
    addnote
]);

AirPadApp.controller('EditNote', [
	'$scope',
    '$state',
	'$stateParams',
	'CurrUser',
    editnote
]);

AirPadApp.controller('ViewDeletedNotes', [
	'$scope',
    '$state',
	'$anchorScroll',
	'$location',
	'CurrUser',
    viewdeletednotes
]);

AirPadApp.controller('LoginController', [
    '$scope',
    '$state',
	'CurrUser',
	'InitialUser',
    'Users',
    login
]);

AirPadApp.controller('SignupController', [
    '$scope',
    '$state',
    'Users',
    signup
]);

AirPadApp.controller('ProfileController', [
    '$scope',
    '$stateParams',
    '$state',
	'CurrUser',
    'Users',
    profile
]);