var notepad = function($scope, $state, $stateParams) {
    $scope.currUser = "John Doe";

    $scope.note = "John Doe";

    $scope.notes = "John Doe";

    $scope.GoToNote = function() {
        $state.go("viewnote", {noteID: "abcd"});
    };

    $scope.listOfNoNotes = {
        notes: []
    };

    $scope.listOfNotes = {
        notes: [
            {
                title: "Note 1",
                content: "Content",
                creator: $scope.currUser,
                creationDate: "Some date",
                recentEditDate: "Some date",
                categories: ["none yet", "none added yet", "none to add yet"],
                id: "Some id"
            },
            {
                title: "Note 2",
                content: "Content",
                creator: $scope.currUser,
                creationDate: "Some date",
                recentEditDate: "Some date",
                categories: ["none yet"],
                id: "Some id"
            },
            {
                title: "Note 3",
                content: "Content",
                creator: $scope.currUser,
                creationDate: "Some date",
                recentEditDate: "Some date",
                categories: ["none yet"],
                id: "Some id"
            },
            {
                title: "Note 4",
                content: "Content",
                creator: $scope.currUser,
                creationDate: "Some date",
                recentEditDate: "Some date",
                categories: ["none yet"],
                id: "Some id"
            }
        ]
    };

    $scope.optionsTitle = {
        height: 230,
        maxHeight: 230,
        width: 500,
        styleWithSpan: true,
        focus: true,
        airMode: false,
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
            ['insert', ['link','picture','video','hr']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
        ]
    };

};

AirPadApp.controller('NotePad', [
	'$scope',
    '$state',
    '$stateParams',
    notepad
]);