var mongoose   = require('mongoose');
var express    = require('express');
var bodyParser = require('body-parser');
var docs = require("express-mongoose-docs");

var userRoutes = require('./routes/userroutes');
var config = require('./config');

// SETUP
// =============================================================================

console.log("UserNet Version '" + require('./package.json').version + "'");

mongoose.connect(config.dbUrl, function(err) {
  if (err) {
    console.log("Failed to initialize Database. Ensure connectivity to '" + config.dbUrl + "'");
    throw err;
  }
});

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
docs(app, mongoose);

var port = process.env.PORT || 4010;

// ROUTES
// =============================================================================
var router = express.Router();

router.get('/', function(req, res) {
  console.log('route / hit');
  res.json({
    message: 'Welcome to the UserNet. A LabNet Service provided to you by FabLab Karlsruhe e.V.'
  });
});

userRoutes(router);

// REGISTER ROUTES -------------------------------
app.use('/api', router);

// START SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);