const express = require("express");
const app = express();

const data = require("./data.json");
app.set("view engine", "pug");
app.use("/static", express.static("public"));

/* GET projects - render index pug template passing the projects array */

app.get("/", (req, res) => {
  res.locals.projects = data.projects;
  res.render("index");
});

/* GET - renders the about pug template containing my profile information and other relevant data about my profile details */

app.get("/about", (req, res, next) => {
  res.render("about");
});

/* GET individual project route - renders an individual project page containing the project selected by a user */

app.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = data.projects[id];
  res.render("project", { project });
});

/* ERROR HANDLERS */

/* 404 Error Handler that catches undefined or non-existent routes */

app.use((req, res, next) => {
  const err = new Error("Page not Found");
  err.statusCode = 404;
  next(err);
});

/* Global Error Handler */

app.use((err, req, res, next) => {
  if (err.statusCode === 404) {
    // If the error's status code is 404 (retrieved by the next function from the 404 handler) then it will render the page-not-found page.
    console.log(`${err}:`, err.statusCode);
    res.render("page-not-found");
  } else {
    // If the error's status code is anything other than 404 then it will render the "error" page and log the error message along with the corresponding status code.
    err.message = "Something went wrong on the server" || err.message;
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode);
    console.log(`${err.message}:`, err.statusCode);
    res.render("error", { err });
  }
});

app.listen(3000);
