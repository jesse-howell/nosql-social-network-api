const { Schema, model } = require('mongoose');

// schema to create a thought reaction
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// schema to create thought model

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
      get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// virtual schema for reactionCount
thoughtSchema
  .virtual('reactionCount')
  // getter
  .get(function () {
    return this.reactions.length;
  });

// initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
