function theDate(timeBehind) {
    var today = new Date();

    if (timeBehind === 0) {
        return (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    }

    var pastDate = new Date();
    pastDate.setDate(today.getDate() - timeBehind);
    return (pastDate.getMonth() + 1) + "/" + pastDate.getDate() + "/" + pastDate.getFullYear();
}

function randomString(length){
    var string = "";
    while(string.length < length && length > 0){
        var randomValue = Math.random();
        string += (randomValue < 0.1 ? Math.floor(randomValue*100): String.fromCharCode(Math.floor(randomValue*26) + (randomValue > 0.5 ? 97 : 65)));
    }
    return string;
}

function getNoteByID(id, notes) {
	var note = null;
	if (notes.length === 0) {
		return note;
	}
	
    for (var i = 0; i < notes.length; i++) {
        if ((id === notes[i].id)) {
            note = notes[i];
            i = notes.length;
        }
    }

    return note;
}

function getNoteIndexByID(id, notes) {
	var noteIndex = -1;
	if (notes.length === 0) {
		return noteIndex;
	}
	
    for (var i = 0; i < notes.length; i++) {
        if ((id === notes[i].id)) {
            noteIndex = i;
            i = notes.length;
        }
    }

    return noteIndex;
}