var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var mongodb = require('mongodb').MongoClient;
var localStrategy = require('passport-local').Strategy;


module.exports = function(app) {
  app.use(cookieParser());
  app.use(session({secret: 'library'}));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new localStrategy({
    usernameField: 'userName',
    passwordField: 'password'
  }, function(username, password, done) {
    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function(err, db) {
      var collection = db.collection('users');
      collection.findOne({username: username}, function(err, results) {
        if(!results) {
          done(null, false);
        } else if(results.password === password) {
          var user = results;
          done(null, user);
        } else {
          done(null, false);
        }

      });
    });
  }));

};