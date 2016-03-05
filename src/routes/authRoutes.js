var express = require('express');
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');
var router = express.Router();



var authRouter = function(nav) {
  router.route('/signUp').post(function(request, response) {
    console.log(request.body);
    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function(err, db) {
      var user = {username: request.body.userName, password: request.body.password};
      db.collection('users').insert(user, function(err, results){
        request.login(results.ops[0], function() {
          response.redirect('/auth/profile');
        });
        db.close();
      });
    });
  });
  router.route('/signIn').post(
    passport.authenticate('local', {failureRedirect: '/'}),
    function(request, response) {response.redirect('/auth/profile'); }
  );
  router.route('/profile').all(function(request,response,next) {
    if(!request.user) {
      response.redirect('/');
    }
    next();
  }).get(function(request,response) {
    response.json(request.user);
  });
  return router;
};
module.exports = authRouter;