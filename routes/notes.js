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
        {safe: true, upsert: false},
        function(err, user) {
            res.send(err);
        });
});

router.post('/edit_note', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);

    var userQuery = { 'mongoose.Types.ObjectId': req.body.userId };
    var aNote = req.body.note;
    var index = req.body.index;

    users.findOne(req.body.userId,
        function(err, user) {
            //if(err) res.send(err);
            var notes = user.notes;

            user.notes[index].title = aNote.title;
            user.notes[index].content = aNote.content;
            user.notes[index].recentEditDate = aNote.recentEditDate;
            user.markModified('notes');
            user.save(function(err, result) {
                if(err) res.send(err);
                else {res.send(user.notes);}
            });

        }
    );

     /*users.update(req.body.userId,
     function(err, user) {
     //if(err) res.send(err);
     var notes = user.notes;

     user.update(
     { 'user.notes[index].title': aNote.title}, {'user.notes[index].content': aNote.content}, {'user.notes[index].recentEditDate': aNote.recentEditDate},
     function(err, result) {
     if(err) res.send(err);
     res.send(result);
     });

     }
     );*/
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

router.get('/get_notes', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);

    var query = { _id: req.query.userId };
    users.find(query, function(err, user) {
        if (err) res.send(err);
        res.send(user);
    });

});

module.exports = router;