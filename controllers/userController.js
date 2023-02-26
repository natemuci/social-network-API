
const { populate } = require('../models/User');
const User = require('../models/User');


module.exports = {
  
  getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
},
  
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate({path: "thoughts"})
    .populate({path: "friends"})
      
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((User) =>
        !student
          ? res.status(404).json({ message: 'No user exists' })
          : User.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser(req,res){
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { ...req.body },
      { new: true }
    )
    .then((updatedData) => res.json(updatedData))
      .catch((err) => res.status(500).json(err));
  },
  
  addFriend(req, res){
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$push: {friends: req.params.friendId}},
      {new: true}
    )
    .then((updatedFriends) => res.json(updatedFriends))
    .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req, res){
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$pull: { friends: req.params.friendId}},
      {new: true}
    )
    .then((deletedFriend) => res.json(deletedFriend))
    .catch((err) => res.status(500).json(err));
  }
};
