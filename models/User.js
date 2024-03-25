const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new mongoose.Schema(
  {
    name: { type: String, Unique: true, Required: true, Trimmed: true },
    email: { type: String, Required: true, Unique: true, match: true },
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
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });
// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
