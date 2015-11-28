var mongoose   = require('mongoose');
var express    = require('express');
var bodyParser = require('body-parser');
var userRoutes = require('./routes/userroutes');

// SETUP
// =============================================================================

dburl = 'mongodb://mongo/usernet';
mongoose.connect(dburl, function(err) {
  if (err) {
    console.log("Failed to initialize Database. Ensure connectivity to '" + dburl + "'");
    throw err;
  }
});

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES
// =============================================================================
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

userRoutes(router);

// REGISTER ROUTES -------------------------------
app.use('/api', router);

// START SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);