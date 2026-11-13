const express = require("express");
const router = express.Router();

const Task = require("../models/Task"); 

router.post("/", async (req, res) => {
    try {
        const taskTitle = req.body.title;

        if (!taskTitle || !taskTitle.trim()) {
            return res.status(400).json({ message: "Task title is required" });
        }

        const newTask = await Task.create({ title: taskTitle });

        res.status(201).json(newTask);

    } catch (err) {
        res.status(500).json({ message: "Failed to create task" });
    }
});

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: "Invalid ID format" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: "Invalid ID format" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            { title: req.body.title }, 
            { new: true, runValidators: true } 
        );
        
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: "Invalid ID or data" });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Only update fields if they were sent in the request
        if ("title" in req.body) task.title = req.body.title;
        if ("completed" in req.body) task.completed = req.body.completed;

        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: "Invalid ID or data" });
    }
});


module.exports = router;