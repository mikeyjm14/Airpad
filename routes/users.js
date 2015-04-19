var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/login', function(req, res) {
    var users = mongoose.model('users', mongoose.model('users').schema);
    users.findOne({ username: req.query.username, password: req.query.password }, function (err, user) {
        if (err) return handleError(err);
        res.send(user);
    });
});

router.post('/signUp', function (req, res) {
    var user = mongoose.model('users', mongoose.model('users').schema);
    var newUser = new user(req.body);
    newUser.save(function (err) {
        if (err) // ...
            console.log('Failure to add user to DB.');
    });
    res.send(newUser);
});

module.exports = router;
