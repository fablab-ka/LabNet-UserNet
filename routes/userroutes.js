var User = require('../models/user');

module.exports = function(router) {

  router.route('/users')

    // get users (GET http://localhost:8080/api/users)
    .get(function(req, res) {
      User.find(function(err, users) {
        if (err) {
          console.error(err);
          res.send(err);
        }

        res.json(users);
      });
    })


    // create a user (POST http://localhost:8080/api/users)
    .post(function(req, res) {

      var user = new User();
      user.name = req.body.name;

      user.save(function(err) {
        if (err) {
          console.error(err);
          res.send(err);
        }

        res.json({ message: 'User created!' });
      });
    });


  router.route('/users/:user_id')

    // get the user with that id (GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err) {
          console.error(err);
          res.send(err);
        }
        res.json(user);
      });
    })

    // update the user with this id (PUT http://localhost:8080/api/users/:user_id)
    .put(function(req, res) {

      User.findById(req.params.user_id, function(err, user) {

        if (err) {
          console.error(err);
          res.send(err);
        }

        user.name = req.body.name;

        user.save(function(err) {
          if (err) {
            console.error(err);
            res.send(err);
          }

          res.json({ message: 'User updated!' });
        });

      });
    })

    // delete the user with this id (DELETE http://localhost:8080/api/users/:user_id)
    .delete(function(req, res) {
      User.remove({
        _id: req.params.user_id
      }, function(err, user) {
        if (err) {
          console.error(err);
          res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
      });
    });

};