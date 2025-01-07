const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const url =  require("./routes/Url.routes");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

//database
db;
app.use("/url", url);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});