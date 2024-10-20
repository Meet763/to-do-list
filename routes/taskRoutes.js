const express = require('express');
const router = express.Router();
const {addTask, viewTask, editTask, deleteTask, markTask} = require('../controller/taskController')
const {jwtAuthMiddleware} = require('../middleware/auth')


// Add a new task
router.post('/addtask', jwtAuthMiddleware, addTask);

// View all tasks
router.get('/viewtasks', jwtAuthMiddleware, viewTask);

// Edit a task
router.put('/edittask/:id', jwtAuthMiddleware, editTask);

// Delete a task
router.delete('/deletetask/:id', jwtAuthMiddleware, deleteTask);

// Mark task as completed
router.patch('/mark/:id', jwtAuthMiddleware, markTask);

module.exports = router;
