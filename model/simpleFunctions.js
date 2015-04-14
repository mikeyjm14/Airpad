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

function findUserByCredentials(username, password, users) {
    var index = -1;
    for (var i = 0; i < users.length; i++) {
        if ((username === users[i].username || username === users[i].email)
            && (password === users[i].password)) {
            index = i;
            i = users.length;
        }
    }
    return index;
}

function getUserByID(id, users) {
    var index = -1;
    for (var i = 0; i < users.length; i++) {
        if ((id === users[i].id)) {
            index = i;
            i = users.length;
        }
    }

    return index;
}

function findUserByUsername(username, users) {
    var index = -1;
    for (var i = 0; i < users.length; i++) {
        if ((username === users[i].username)) {
            index = i;
            i = users.length;
        }
    }

    return index;
}

function findUserByEmail(email, users) {
    var index = -1;
    for (var i = 0; i < users.length; i++) {
        if ((email === users[i].email)) {
            index = i;
            i = users.length;
        }
    }

    return index;
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