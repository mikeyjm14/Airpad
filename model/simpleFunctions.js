function theDate(timeBehind) {
    var today = new Date();

    if (timeBehind === 0) {
        return (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    }

    var pastDate = new Date();
    pastDate.setDate(today.getDate() - timeBehind);
    return (pastDate.getMonth() + 1) + "/" + pastDate.getDate() + "/" + pastDate.getFullYear();
}

function getNoteByID(id, notes) {
	var note = null;
	if (notes.length === 0) {
		return note;
	}
	
    for (var i = 0; i < notes.length; i++) {
        if ((id === notes[i]._id)) {
            note = notes[i];
            i = notes.length;
        }
    }

    return note;
}

function injectHTML(elementID, text) {
	document.getElementById(elementID).innerHTML = text;
}

function removeNote(index, notes, amount) {
	var noteArray = notes.splice(index, amount);
	return noteArray.length > 0;
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