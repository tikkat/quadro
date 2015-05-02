// set up ========================
var express        = require('express');
var app            = express();                  // create our app w/ express
var mongoose       = require('mongoose');        // mongoose for mongodb
var morgan         = require('morgan');          // log requests to the console (express4)
var bodyParser     = require('body-parser');     // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://localhost/four-quadrant');          // connect to mongoDB database

app.use(express.static(__dirname));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//  Model
var Task = mongoose.model('Task', {
  text     : String,
  quadrant : String
});

// routes ======================================================================
// API - get all tasks
app.get('/api/tasks', function(req, res) {

  // use mongoose to get all tasks in the database
  Task.find(function(err, tasks) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
        res.send(err);

    res.json(tasks); // return all tasks in JSON format
  });
});

// create todo and send back all tasks after creation
app.post('/api/tasks', function(req, res) {
  console.log(req);
  // create a todo, information comes from AJAX request from Angular
  Task.create({
      text     : req.body.text,
      quadrant : req.body.quadrant,
      done     : false
  }, function(err, todo) {
      if (err)
          res.send(err);

      // get and return all the tasks after you create another
      Task.find(function(err, tasks) {
          if (err)
              res.send(err);
          res.json(tasks);
      });
  });
});

// delete a task
app.delete('/api/tasks/:todo_id', function(req, res) {
  Task.remove({
      _id : req.params.todo_id
  }, function(err, todo) {
      if (err)
          res.send(err);

      // get and return all the tasks after you create another
      Task.find(function(err, tasks) {
          if (err)
              res.send(err);
          res.json(tasks);
      });
  });
});

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
