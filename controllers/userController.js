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
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  /* TODO: Create an updateUser route */
  async getUserToUpdate(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
      res.json({ message: 'User updated successfully' });
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
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
