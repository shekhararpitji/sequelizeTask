const express = require("express");
const cookieparser = require("cookie-parser");
const { redis } = require("./config/redis.config");
require("dotenv").config();
redis();
const app = express();
app.use(express.json());
app.use(cookieparser());
app.use("/user", require("./routes/userRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
