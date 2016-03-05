var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var router = express.Router();

var mongoFind = function(query, callback) {
  var url = 'mongodb://localhost:27017/libraryApp';
  mongodb.connect(url, function(err, db) {
    var collection = db.collection('books');
    collection.find(query).toArray(function(err, results) {
      callback(err, results);
      db.close();
    });
  });
};

var bookRouter = function(nav) {
  router.route('/').get(function(request, response) {
    mongoFind({}, function(err, results) {
      response.render('bookList', {title: 'Books',nav: nav, books: results});
    });
  });
  router.route('/:id').get(function(request, response) {
    var id = new objectId(request.params.id);
    mongoFind({_id: id}, function(err, results) {
      book = results[0];
      response.render('bookSingle', {title:book.title,nav: nav, book: book});
    });
  });
  return router;
};
module.exports = bookRouter;