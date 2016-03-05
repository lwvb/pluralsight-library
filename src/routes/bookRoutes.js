var express = require('express');
var router = express.Router();

var books = [
  {title: 'The Hunger Games (Book 1)', author: 'Suzanne Collins'},
  {title: 'Gone Girl', author: 'Gillian Flynn'},
  {title: 'The Fault in Our Stars', author: 'John Green, Nicola Winstanley'},
  {title: 'The Girl on the Train', author: 'Paula Hawkins'},
  {title: 'A Walk in the Woods: Rediscovering America on the Appalachian Trail', author: 'Bill Bryson'},
  {title: 'Steve Jobs', author: 'Walter Isaacson'},
];

var bookRouter = function(nav) {
  router.route('/').get(function(request, response) {
    response.render('bookList', {title: 'Books',nav: nav, books: books});
  });
  router.route('/:id').get(function(request, response) {
    var id = request.params.id;
    response.render('bookSingle', {title:books[id].title,nav: nav, book: books[id]});
  });
  return router;
}
module.exports = bookRouter;