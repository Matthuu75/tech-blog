require("dotenv").config();

// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const session = require("express-session");
const path = require("path");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets Handlebars as the defult template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));
app.use(require("./controllers/index.js"))

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});