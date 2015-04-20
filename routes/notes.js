var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.post('/add_note', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);
    var note = mongoose.model('notes', mongoose.model('notes').schema);
    var newNote = new note(req.body);

    var query = { _id: req.body.user.type};
    users.findByIdAndUpdate(query,
        {$push: {"notes": newNote}},
        {safe: true, upsert: false}, function(err, user) {
            res.send(err);
        });

});

router.post('/edit_note', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);
    var note = mongoose.model('notes', mongoose.model('notes').schema);
    //var newNote = new note(req.body);

    var userQuery = { _id: req.query.userId};
    var noteQuery = { _id: req.query.noteId};
    users.find(userQuery,
        function(err, user) {
            note.findAndUpdate(noteQuery, {$push: {"notes": newNote}},
                {safe: true, upsert: false},
                function(err, user) {
                    res.send(err);
                });
        });

});

router.get('/get_note', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);

    var userQuery = { _id: req.query.userId};

    users.find(userQuery,
        function(err, user) {
            res.send(user);
        });

});

router.get('/get_notes', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);

    var query = { _id: req.query.userId };
    users.find(query, function(err, user) {
            if (err) res.send(err);
            res.send(user);
        });

});

module.exports = router;