const Task = require("../models/Task");

// 1. GET ALL (Only gets tasks for the logged-in user)
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
};

// 2. GET ONE (By ID)
const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: "Invalid ID format" });
    }
};

// 3. CREATE (POST)
const createTask = async (req, res) => {
    try {
        const taskTitle = req.body.title;

        if (!taskTitle || !taskTitle.trim()) {
            return res.status(400).json({ message: "Task title is required" });
        }

        const newTask = await Task.create({ 
            title: taskTitle,
            user: req.user.userId 
        });
        
        res.status(201).json(newTask);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create task" });
    }
};

// 4. UPDATE (PUT)
const updateTask = async (req, res) => {
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
};

// 5. PATCH
const patchTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if ("title" in req.body) task.title = req.body.title;
        if ("completed" in req.body) task.completed = req.body.completed;

        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: "Invalid ID or data" });
    }
};

// 6. DELETE
const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: "Invalid ID format" });
    }
};

module.exports = { getTasks, getTask, createTask, updateTask, patchTask, deleteTask };