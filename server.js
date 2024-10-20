const express = require('express');
const db = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
const bodyParsor = require('body-parser');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use(bodyParsor.json());



app.get('/', (req, res) => {
    res.send("welcome to todo list")
    console.log("hello server")
})

app.use('/user', userRoutes)

app.use('/task', taskRoutes)

app.listen(PORT, () => {
    console.log("server in on")
})