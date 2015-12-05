var User = require('../models/user');

module.exports = function(router) {

  router.route('/users')

    // get users (GET http://localhost:4010/api/users)
    .get(function(req, res) {
      console.log('get users');

      User.find(function(err, users) {
        if (err) {
          console.error(err);
          res.send(err);
        }

        res.json(users);
      });
    })


    // create a user (POST http://localhost:4010/api/users)
    .post(function(req, res) {
      console.log('create user');

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

    // get the user with that id (GET http://localhost:4010/api/users/:user_id)
    .get(function(req, res) {
      console.log('get user ' + req.params.user_id);

      User.findById(req.params.user_id, function(err, user) {
        if (err) {
          console.error(err);
          res.send(err);
        }

        if (user) {
          res.json(user);
        } else {
          res.status(404).send('Not found');
        }
      });
    })

    // update the user with this id (PUT http://localhost:4010/api/users/:user_id)
    .put(function(req, res) {
      console.log('update user ' + req.params.user_id);

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

    // delete the user with this id (DELETE http://localhost:4010/api/users/:user_id)
    .delete(function(req, res) {
      console.log('delete user ' + req.params.user_id);

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