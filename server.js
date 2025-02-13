require('dotenv').config();
const express = require('express');
const CONNECT_TO_MONGO = require('./database/mongo-database');

CONNECT_TO_MONGO();

const app = express();

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
  console.log('Server runs on post', PORT);
});