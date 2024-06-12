const express = require("express");
const path = require('path');
const app = express();
const port = 8080;

const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public"))); // Use app.use instead of app.set for static files

let posts = [
    {
        id: "1a",
        username: "smrutee",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "adyasha",
        content: "Currently I'm preparing for neet.."
    },
    {
        id: uuidv4(),
        username: "smruteebehera",
        content: "I got selected for m.tech at IIT Bombay.."
    },
];

app.get("/posts", (req, res) => {
    res.render("index", { posts }); // Pass the posts variable to the template
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs"); 
});

app.post("/posts", (req, res) => {
    let { username, content} = req.body;
    let id = uuidv4();
    posts.push({ id, username, content})
    res.send("post request working");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs" ,{post})
});

app.listen(port, () => {
    console.log("Listening to port : 8080");
});
