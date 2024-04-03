const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID!',
        });
      }

      res.json('Created the thought! 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // update a thought
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with this ID!' });
      }

      res.json({ message: 'Thought successfully updated!', updatedThought });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete a thought
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought with this ID!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought created but no user with this id!' });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a thought reaction
  async addThoughtReaction(req, res) {
    try {
      const addedThoughtReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!addedThoughtReaction) {
        return res.status(404).json({ message: 'No thought with this ID!' });
      }

      res.json({
        message: 'Thought reaction successfully added!',
        addedThoughtReaction,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // remove thought reaction
  async removeThoughtReaction(req, res) {
    try {
      const removedThoughtReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!removedThoughtReaction) {
        return res.status(404).json({ message: 'No thought with this ID!' });
      }

      res.json({
        message: 'Thought reaction successfully removed!',
        removedThoughtReaction,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
