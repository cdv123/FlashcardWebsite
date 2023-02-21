const express = require('express')
const app = express()
const hostname = '127.0.0.1';
const fs = require('fs');
const port = 8080;
const cors = require('cors')
const path = require('path')
app.use(cors())
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.json())
app.listen(port)
module.exports = app;
