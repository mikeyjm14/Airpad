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

AirPadApp.controller('NotePad', [
	'$scope',
    '$state',
    '$stateParams',
    notepad
]);