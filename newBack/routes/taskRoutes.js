const express = require('express');
const { fetchAllTasks, addTask } = require('../controllers/taskController');

const router = express.Router();

router.get('/fetchAllTasks', fetchAllTasks);
router.post('/addTask', (req, res) => addTask(req, res));



module.exports = router;
