const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  nameTask: { type: String, required: true },
  taskDescription: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: Boolean, default: false }
}, { _id: true, timestamps: true });

const userTaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true, unique: true },
  userEmail: { type: String, required: true },
  tasks: [taskSchema]
}, { timestamps: true });

module.exports = mongoose.model("userTasks", userTaskSchema); 