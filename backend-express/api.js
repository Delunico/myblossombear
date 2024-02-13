const express = require('express')
const app = express()
var cookieParser = require('cookie-parser')
var db = require('./db.js')
var bodyParser = require('body-parser')
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const router = express.Router();
app.use("/api", router);


router.get('/tasks', async (req, res) => {
    try {
        let data = (await db.execute('SELECT * FROM tasks'))[0]
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/task', async (req, res) => {
    const task = req.body.task
    try {
        let newTask = await db.execute('INSERT INTO tasks (title, is_completed) VALUES(?,?)', [task.title, task.is_completed])
        res.status(200).json(newTask)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/task', async (req, res) => {
    const task = req.body.task
    try {
        let updatedTask = await db.execute('UPDATE tasks SET title = ?, is_completed = ? WHERE task_id = ?', [task.title, task.is_completed, task.task_id])
        res.status(200).json(updatedTask)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`blossomapi listening at http://localhost:${process.env.PORT || 5000}`)
})