const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        '-__v'
      );
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const createdUser = await User.create(req.body);
      res.json({ message: 'User created successfully!', createdUser });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  /* TODO: Create an updateUser route */
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  /* TODO: Create a deleteUser route */
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      if (!deletedUser) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
      res.json({ message: 'User successfully deleted', deletedUser });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // TODO: Add friend to user
  async addFriend(req, res) {
    try {
      const addedFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!addedFriend) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
      res.json({ message: 'Friend successfully added', addedFriend });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // TODO: Remove friend from user
  async removeFriend(req, res) {
    try {
      const removedFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!removedFriend) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
      res.json({ message: 'Friend successfully removed', removedFriend });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
