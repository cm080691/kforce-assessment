require("dotenv").config();
const dev = process.env.NODE_ENV !== "production";
const path = require("path");
const express = require("express");
const app = express();
app.use(express.static(path.join(__dirname, "client", "dist")));

if (dev) {
  const webpackDev = require("./dev");
  app.use(webpackDev.comp).use(webpackDev.hot);
}

const templatesJson = require('./data/templates.json');
const extendedTemplatesJson = require('./data/extendedTemplate.json');
app.get("/templates", (req, res) => {
  res.json(templatesJson);
});

app.get("/extendedTemplate", (req, res) => {
  res.json(extendedTemplatesJson);
});



app.listen(3000, function () {
  console.log("Server started on :3000");
});
