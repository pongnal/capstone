const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const UserTask = require("../models/userTasks");

// POST /tasks - Add a new task for the logged-in user
router.post("/", verifyToken, async (req, res) => {
  try {
    const { nameTask, taskDescription, date, status } = req.body;
    const userId = req.user._id;
    const userEmail = req.user.email;
    const newTask = { nameTask, taskDescription, date, status };

    let userTask = await UserTask.findOne({ userId });
    if (userTask) {
      userTask.tasks.push(newTask);
      await userTask.save();
    } else {
      userTask = new UserTask({
        userId,
        userEmail,
        tasks: [newTask]
      });
      await userTask.save();
    }
    res.status(201).json(userTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /tasks - Get all tasks for the logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const userTask = await UserTask.findOne({ userId });
    
    if (!userTask) {
      return res.status(200).json({ tasks: [] });
    }
    
    res.json(userTask);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /tasks/:taskId/status - Update the status of a specific task
router.put("/:taskId/status", verifyToken, async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const userId = req.user._id;

    const userTask = await UserTask.findOne({ userId });
    
    if (!userTask) {
      return res.status(404).json({ error: "No tasks found for this user" });
    }

    // Find the specific task by its _id
    const task = userTask.tasks.id(taskId);
    
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task status
    task.status = status;
    await userTask.save();

    res.json({ message: "Task status updated successfully", task });
  } catch (err) {
    console.error("Error updating task status:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /tasks/:taskId - Delete a specific task
router.delete("/:taskId", verifyToken, async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;

    const userTask = await UserTask.findOne({ userId });
    
    if (!userTask) {
      return res.status(404).json({ error: "No tasks found for this user" });
    }

    // Find and remove the specific task by its _id
    const task = userTask.tasks.id(taskId);
    
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Remove the task from the array
    userTask.tasks.pull(taskId);
    await userTask.save();

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
