const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    name: { type: String, unique: true, required: true, trim: true },
    email: { type: String, required: true, unique: true, match: true },
    // TODO: add thought model array
    thoughts: [
      /* array of _id values referencing the Thought model*/
    ],
    // TODO: add user model array
    friends: [
      /* array of _id values referencing the User model (self-reference) */
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual schema for friendCount
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
