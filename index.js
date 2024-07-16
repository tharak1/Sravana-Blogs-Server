const express = require("express");
const client = require("./connectDB");
const dotenv = require("dotenv").config();

const app = express();
const cors = require("cors");

client;
app.use(cors());
app.use(express.json());
app.use('/api/users',require("./routes/userRoutes"));
app.use("/api/blogs",require("./routes/blogsRoute"));

app.listen(5000,()=>{
    console.log("server live at 5000");
});
