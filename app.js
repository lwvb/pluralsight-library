var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 5001;
var nav = [{link:'/books', name:'Books'},{link:'/authors', name:'Authors'}];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

// middleware
app.use(express.static('public'));
app.use('/lib', express.static('bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
require('./src/config/passport')(app);

// templating
app.set('views', 'src/views');
app.set('view engine', 'ejs');

// routes
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.get('/', function(request, response) {
  response.render('index', {
    title: 'Hello this is the title',
    nav: nav});
});
// start
app.listen(port, function(err) {
  console.log('running server on port ' + port);
});