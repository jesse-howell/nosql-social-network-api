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
      const createdThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: req.body.thoughtid } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID!',
        });
      }

      res.json({ message: 'Created the thought! 🎉', createdThought });
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

      // const thought = await Thought.findOneAndUpdate(
      //   { thoughts: req.params.thoughtId },
      //   { $pull: { thoughts: req.params.thoughtId } },
      //   { new: true }
      // );

      // if (!thought) {
      //   return res
      //     .status(404)
      //     .json({ message: 'No thought found with that ID!' });
      // }

      res.json({ message: 'Thought successfully deleted!', deletedThought });
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
        message: 'Reaction successfully added!',
        addedThoughtReaction,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // remove thought reaction
  async removeThoughtReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with this ID!' });
      }

      res.json({
        message: 'Reaction successfully removed!',
        updatedThought,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
