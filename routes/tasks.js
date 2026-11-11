const express = require("express");
const router = express.Router();

const tasks = require("../data/tasks");

router.post("/", (req, res) => {
	const taskTitle = req.body.title;

	if (!taskTitle || !taskTitle.trim()) {
		return res.status(400).send("Task title is required ");
	} else {
		tasks.push({ title: taskTitle });
		return res.status(201).send(`task received : ${taskTitle}`)
	}
});

router.get("/", (req, res) => {
	res.json(tasks);
});

router.get("/:index", (req, res) => {
	const index = Number(req.params.index);

	if (!Number.isInteger(index) || index < 0) {
		return res.status(400).json({ message: "Invalid index" });
	}

	const task = tasks[index];

	if (!task) {
		return res.status(404).json({ message: "Task not found" });
	}
	res.json(task);
});

router.delete("/:index", (req, res) => {

	const index = Number(req.params.index);

	if (!Number.isInteger(index) || index < 0) {
		return res.status(400).json({ message: "Invalid index" });
	}

	const task = tasks[index];

	if (!task) {
		return res.status(404).json({ message: "Task not found" });
	}

	tasks.splice(index, 1);
	res.json({ message: "Tasks deleted successfully" })
});

router.put("/:index", (req, res) => {
	const index = Number(req.params.index);

	if (!Number.isInteger(index) || index < 0) {
		return res.status(400).json({ message: "Invalid Index" });
	}

	const task = tasks[index];

	if (!task) {
		return res.status(404).json({ message: "Task not found" });
	}

	const newTitle = req.body.title;

	if (!newTitle || !newTitle.trim()) {
		return res.status(400).json({ message: "Invalid Title" });
	}

	task.title = newTitle;
	res.status(200).json({ message: "Task updated successfully" });
});

router.patch("/:index", (req, res) => {
	const index = Number(req.params.index);

	if (!Number.isInteger(index) || index < 0) {
		return res.status(400).json({ message: "Invalid Index" });
	}

	const task = tasks[index];

	if (!task) {
		return res.status(404).json({ message: "Task not found" });
	}

	if ("title" in req.body) {
		const newTitle = req.body.title;

		if (!newTitle || typeof newTitle !== "string" || !newTitle.trim()) {
			return res.status(400).json({ message: "Invalid Title" });
		}

		task.title = newTitle.trim();
	}

	return res.status(200).json({
		message: "Task updated successfully",
		task
	});
});


module.exports = router;