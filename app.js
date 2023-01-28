const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = ["Do Yoga", "Do Coding"];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    const day = date.getDate();
    res.render("list", {listTitle: day, newListItem: items});
})

app.post("/", function(req, res) {
    const item = req.body.newItem;
    if(req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItem: workItems});
})

app.post("/work", function(req, res) {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", function(req,res) {
    res.render("about");
})

app.listen(3000, function () {
    console.log("Server is running on 3000...");
})