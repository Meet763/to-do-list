const Task = require('../models/task');

// Add a new task
const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const data = {
      title,
      description,
      userid : req.user.id
    }

    const newTask = new Task(data);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
}

// View all tasks
const viewTask = async (req, res) => {
  try {
    userId = req.user.id
    const tasks = await Task.find({userid:userId});
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving tasks', error: err.message });
  }
}

// Edit a task
const editTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
}

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
}

// Mark task as completed
const markTask = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { isCompleted: true }, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error marking task as completed', error: err.message });
  }
}

module.exports = {addTask, viewTask, editTask, deleteTask, markTask};
