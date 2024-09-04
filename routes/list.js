const router = require('express').Router();
const User = require('../models/user');
const List = require('../models/list');

// Create Task
router.post('/addTask', async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const newList = new List({ title, body, user: existingUser._id }); // Use ObjectId, not the whole user object
        await newList.save();

        existingUser.list.push(newList._id); // Push ObjectId to user's list
        await existingUser.save();

        res.status(200).json({ list: newList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// Update Task
router.put('/updateTask/:id', async (req, res) => {
    try {
        const {title, body} = req.body
        const list  = await List.findByIdAndUpdate(req.params.id, {title, body})
        list.save().then(() => res.status(200).json({message: "Task updated"}))
    } catch (error) {
        console.error(error);
        console.log(error);   
    }
});

// Delete Task
router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const { id } = req.body; // This line is unnecessary; you already have req.params.id
        const existingUser = await User.findByIdAndUpdate(
            req.body.id, // Assume `id` is the user's id
            { $pull: { list: req.params.id } }
        );

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const deletedList = await List.findByIdAndDelete(req.params.id);
        if (!deletedList) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// Get Tasks
router.get('/getTask/:id', async (req, res) => {
    try {
        const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });

        if (list.length === 0) {
            return res.status(200).json({ message: "No Tasks" });
        }

        res.status(200).json({ list });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

module.exports = router;
