var notepad = function($scope, $state, $stateParams) {
    $scope.currUser = "John Doe";

    $scope.note = "John Doe";

    $scope.notes = "John Doe";
};

AirPadApp.controller('NotePad', [
	'$scope',
    notepad
]);