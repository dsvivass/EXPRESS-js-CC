const User = require('../models/User')

exports.createUser = (req, res) => {
    const user = new User(req.body)

    user.save()
        .then(result => {
            res.status(201).json({
                message: 'User created',
                user: result,
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error creating user',
                error: err,
            })
        }
    )
}

exports.getUsers = (req, res) => {
    
    User.findAll()
      .then(users => {
        res.status(200).json({
          message: "Users fetched successfully",
          users: users
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  
