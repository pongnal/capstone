const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const authRoutes = require("./routes/auth");

mongoose.connect("mongodb://localhost:27017/")
    .then(() => {
        const app = express();
        app.use(cors({
            origin: '*', // allow all origins
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true,
        }));
        app.use(express.json());

        app.use("/auth", authRoutes);

        app.listen(3000, () => console.log("Task Manager API running on port 3000"));
});