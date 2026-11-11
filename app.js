const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks");
app.use(express.json());
app.use("/tasks", tasksRouter);

app.get("/", (req, res) => {
	res.send("welcome to my first Express server ")
});

app.get("/about", (req, res) => {
	res.send("welcome to the about section ")
});

app.get("/contact", (req, res) => {
	res.send("welcome to the contact section")
});

app.use((req, res) => {
	res.status(404).send("404 - page not found");
});

app.listen(3000, () => {
	console.log("server running at http://localhost:3000");
})