const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const mainRouter = require("./routes/mainRouter");
const addRouter = require("./routes/addRouter");
const getRouter = require("./routes/getRouter");
const deleteRouter = require("./routes/deleteRouter");

app.use(express.urlencoded({ extended: true }));
app.use("/", mainRouter);
app.use("/add", addRouter);
app.use("/get", getRouter);
app.use("/delete", deleteRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
