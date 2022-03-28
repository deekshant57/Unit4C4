const mongoose = require("mongoose");
const User = require("./user.model");

// title ( String, required )
// createdAt
// updatedAt

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // lastName: { type: String, required: false },
    // email: { type: String, required: true },
    // password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Todo = mongoose.model("todo", userSchema);

module.exports = Todo;
