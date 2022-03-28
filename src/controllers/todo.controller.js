const Todo = require("../models/todo.model");

const express = require("express");

const router = express.Router();

const authenticate = require("../middlewares/authenticate");

// get all todos request from logged in user.
router.get("", authenticate, async (req, res) => {
  try {
    const todo = await Todo.find().lean().exec();

    return res.status(200).send(todo);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Post todo request of a logged in user

router.post("", authenticate, async (req, res) => {
  req.body.userId = req.userId;
  try {
    const todo = await Todo.create(req.body);
    return res.status(200).send(todo);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// get a post of user if user is logged in
router.get("/:id", authenticate, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id).lean().exec();

    return res.status(200).send(todo);
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
});

// update a todo if user is logged in
router.patch("/:id", authenticate, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).send(todo);
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
});

// delete a todo if user is loggedin
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    return res.status(200).send(todo);
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
});

module.exports = router;
