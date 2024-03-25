const { Schema, model } = require('mongoose');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // TODO: create getter to format timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: {
      // TODO: array of reactionSchema documents
    },
    responses: [Response],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per video
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// TODO: create reactionSchema
// Initialize our Video model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
