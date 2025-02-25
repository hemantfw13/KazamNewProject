const redisClient = require('../config/redis');
const Task = require('../models/Task');

const REDIS_KEY = 'FULLSTACK_TASK_HEMANT';

const addTask = async (req, res) => {
    let taskText = typeof req === "string" ? req : req.body.task;
    if (!taskText) return res.status(400).json({ error: "Task is required" });

    let tasks = await redisClient.get(REDIS_KEY);
    tasks = tasks ? JSON.parse(tasks) : [];

    tasks.push(taskText);

    if (tasks.length > 50) {
        await Task.insertMany(tasks.map(task => ({ task })));
        await redisClient.del(REDIS_KEY);
        console.log(" Tasks moved to MongoDB and Cache cleared.");
    } else {
        await redisClient.set(REDIS_KEY, JSON.stringify(tasks));
    }

    if (res) res.status(201).json({ message: "Task added successfully" });
};

const fetchAllTasks = async (req, res) => {
    let tasks = await redisClient.get(REDIS_KEY);
    tasks = tasks ? JSON.parse(tasks) : [];

    const dbTasks = await Task.find();
    res.json([...tasks, ...dbTasks]);
};

module.exports = { addTask, fetchAllTasks };
