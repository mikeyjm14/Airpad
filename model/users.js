var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var notesSchema = mongoose.model('notes', notesSchema);

var usersSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    about: String,
    signupDate: String,
    amountOfNotes: Number,
    amountFavorited: Number,
    amountDeleted: Number,
    notes: [notesSchema],
    favs: [notesSchema],
    deleted: [notesSchema]
});

mongoose.model('users', usersSchema);