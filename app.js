var express = require('express');

var app = express();

var port = process.env.PORT || 5001;
var nav = [{link:'/books', name:'Books'},{link:'/authors', name:'Authors'}];
var bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(express.static('public'));
app.use('/lib', express.static('bower_components'));
app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.get('/', function(request, response) {
  response.render('index', {
    title: 'Hello this is the title',
    nav: nav});
});

app.listen(port, function(err) {
  console.log('running server on port ' + port);
});