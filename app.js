const express = require("express");
const app = express();

const data = require("./data.json");
app.set("view engine", "pug");
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.locals.projects = data.projects;
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = data.projects[id];
  res.render("project", { project });
});

app.use((req, rest, next) => {
  const err = new Error("Page not Found");
  err.statusCode = 404;
  console.log(`${err.message}:`, err.statusCode);
  next(err);
});

app.use((err, req, res, next) => {
  if (err.statusCode === 404) {
    res.render("page-not-found");
  } else {
    err.message = "Something went wrong on the server" || err.message;
    err.statusCode = err.statusCode || 500;
    res.status = err.statusCode;
    console.log(`${err.message}:`, err.statusCode);
    res.render("error", { err });
  }
});

app.listen(3000);
