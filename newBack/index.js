const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const redisClient = require('./config/redis');
const { client: mqttClient } = require('./config/mqtt'); 
const taskRoutes = require('./routes/taskRoutes');
const { addTask } = require('./controllers/taskController');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/tasks', taskRoutes);

mqttClient.on('message', async (topic, message) => {
    if (topic === '/add') {
        await addTask(message.toString());
        console.log("Task added:", message.toString());
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
