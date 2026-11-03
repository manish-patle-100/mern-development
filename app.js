const express = require("express");
const app = express();
const tasks =[];
app.use(express.json());

app.get("/",(req,res)=>{
	res.send("welcome to my first Express server ")
});

app.get("/about",(req,res)=>{
	res.send("welcome to the about section ")
});

app.get("/contact",(req,res)=>{
	res.send("welcome to the contact section")
});

app.post("/tasks",(req,res) =>{
const taskTitle =req.body.title;

   if (!taskTitle || !taskTitle.trim()){
   res.status(400).send("Task title is required ");
}else{
	taskTitle.push({title: taskTitle});
	res.status(201).send(`task received : ${taskTitle}`)
}
});

app.use((req,res)=>{
	res.status(404).send("404 - page not found");
});

app.listen(3000,()=> {
	console.log("server running at http://localhost:3000");
})