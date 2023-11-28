const express = require("express");
const cookieparser = require('cookie-parser'); 
const pass = require('./config/passport.config')
require('dotenv').config();
const app = express();
pass(app);
app.use(express.json());
app.use(cookieparser()); 
app.use('/user',require('./routes/userRoutes'));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
