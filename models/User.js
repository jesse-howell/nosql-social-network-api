const { Schema, model } = require('mongoose');

// schema to create user model
const userSchema = new Schema(
  {
    name: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email.',
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// virtual schema for friendCount
userSchema
  .virtual('friendCount')
  // getter
  .get(function () {
    return this.friends.length;
  });
// initialize our User model
const User = model('user', userSchema);

module.exports = User;
