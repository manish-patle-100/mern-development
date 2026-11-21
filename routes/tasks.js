const express = require("express");
const router = express.Router();

const { 
    getTasks, 
    getTask, 
    createTask, 
    updateTask, 
    patchTask, 
    deleteTask 
} = require("../controllers/taskController");

// 1. Add this line to import the middleware
const { protect } = require("../middleware/authMiddleware");

// 2. Add "protect" to every route right after the path
router.get("/", protect, getTasks);
router.get("/:id", protect, getTask);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.patch("/:id", protect, patchTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;