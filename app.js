var express = require('express');

var app = express();

var port = process.env.PORT || 5001;

app.use(express.static('public'));
app.use('/lib', express.static('bower_components'));
app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index', {title: 'Hello this is the title', list: ['a','b']});
});

app.get('/books', function(request, response) {
  response.send('Hello books');
});

app.listen(port, function(err) {
  console.log('running server on port ' + port);
});