var express = require('express');

var app = express();

var port = 5000;

app.use(express.static('public'));
app.use('/lib', express.static('bower_components'));
// TODO: temp route to make things work
app.use(express.static('src/views'));


app.get('/', function(request, response) {
  response.send('Hello world');
});

app.get('/books', function(request, response) {
  response.send('Hello books');
});

app.listen(port, function(err) {
  console.log('running server on port ' + port);
});