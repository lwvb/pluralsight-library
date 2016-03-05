var express = require('express');
var mongodb = require('mongodb').MongoClient;
var router = express.Router();

var books = [
  {title: 'The Hunger Games (Book 1)', author: 'Suzanne Collins'},
  {title: 'Gone Girl', author: 'Gillian Flynn'},
  {title: 'The Fault in Our Stars', author: 'John Green, Nicola Winstanley'},
  {title: 'The Girl on the Train', author: 'Paula Hawkins'},
  {title: 'A Walk in the Woods: Rediscovering America on the Appalachian Trail', author: 'Bill Bryson'},
  {title: 'Steve Jobs', author: 'Walter Isaacson'},
];

var adminRouter = function(nav) {
  router.route('/addBooks').get(function(request, response) {
    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function(err, db) {
      var collection = db.collection('books');
      collection.insertMany(books, function(err, results){
        response.send(results);
        db.close();
      });
    });
  });
  return router;
};
module.exports = adminRouter;