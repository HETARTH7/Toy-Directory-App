const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const { default: mongoose } = require("mongoose");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const date = new Date();
const currentYear = date.getFullYear();
mongoose.connect("mongodb://localhost:27017/toyDB");

const toySchema = new mongoose.Schema({
  name: String,
  desc: String,
});
const Toy = new mongoose.model("Toy", toySchema);

app.post("/delete", (req, res) => {
  const deleteId = req.body.delete;
  Toy.findByIdAndRemove(deleteId, (err) => {
    if (!err) {
      console.log("Deleted");
      res.redirect("/directory");
    }
  });
});

app.get("/", (req, res) => res.render("home", { year: currentYear }));
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));
app.get("/directory", (req, res) => {
  Toy.find({}, (err, foundToy) => {
    res.render("directory", { list: foundToy });
  });
});
app.get("/add", (req, res) => res.render("addDir"));

app.post("/register");

app.post("/login");

app.post("/add", (req, res) => {
  const record = new Toy({
    name: req.body.toyName,
    desc: req.body.toyDesc,
  });
  record.save();
  res.redirect("/directory");
});

app.post("/directory", (req, res) => {
  res.redirect("/add");
});
app.listen(3000, console.log("Server running at port 3000"));
