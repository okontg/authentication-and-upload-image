require('dotenv').config();
const express = require('express');
const CONNECT_TO_MONGO = require('./database/mongo-database');
const auth__routes = require('./routes/authen-route');
const WELCOME__PAGE = require('./routes/auth-user');
const ADMIN_USER = require('./routes/auth-admin');

CONNECT_TO_MONGO();

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());

app.use('/api/authroutes', auth__routes);
app.use('/api/home', WELCOME__PAGE);
app.use('/api/admin', ADMIN_USER);


app.listen(PORT, ()=>{
  console.log('Server runs on post', PORT);
});