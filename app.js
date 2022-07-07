const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
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

app.get("/", (req, res) => res.render("home", { year: currentYear }));
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));
app.get("/directory", (req, res) => res.render("directory"));
app.get("/add", (req, res) => res.render("addDir"));

app.post("/register");

app.post("/login");

app.post("/add", (req, res) => {
  const record = {
    name: req.body.toyName,
    desc: req.body.toyDesc,
  };
});
app.listen(3000, console.log("Server running at port 3000"));
