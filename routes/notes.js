var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.post('/add_note', function (req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);
    var note = mongoose.model('notes', mongoose.model('notes').schema);
    var newNote = new note(req.body);
    var query = { _id: req.body.user.type};
    users.findByIdAndUpdate(req.body.user.type,
        {$push: {"notes": newNote}},
        {safe: true, upsert: true});
    res.send(newNote);
});

module.exports = router;