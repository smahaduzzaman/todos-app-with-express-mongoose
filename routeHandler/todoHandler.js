const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);

// Get All The Todos 
router.get('/', async (req, res) => {
    res.send('Get All The Todos');
});

// Get A Single Todo
router.get('/:id', async (req, res) => {
    res.send('Get A Single Todo');
});

// Create A Todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err, todo) => {
        if (err) {
            error: "Something went wrong!";
        } else {
            message: "Todo saved successfully!";
        }
    });
});

// Create All Todos
router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({ error: "Something went wrong!" });
        } else {
            res.status(200).json({ message: "Todos saved successfully!" });
        }
    });
});

// Update A Todo
router.put('/:id', async (req, res) => {
    await Todo.updateOne(
        { _id: req.params.id },
        {
            $set: {
                status: "completed"
            },
        },
        (err) => {
            if (err) {
                res.status(500).json({ error: "Something went wrong!" });
            } else {
                res.status(200).json({ message: "Todo Updated successfully!" });
            }
        }

    )
});

// Delete A Todo
router.delete('/:id', async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({ error: "Something went wrong!" });
        } else {
            res.status(200).json({ message: "Todo Deleted successfully!" });
        }
    });
});

module.exports = router;
