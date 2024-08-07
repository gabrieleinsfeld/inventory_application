const express = require("express");
const app = express();
const mainRouter = require("./routes/mainRouter");
const addRouter = require("./routes/addRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", mainRouter);
app.use("/add", addRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
