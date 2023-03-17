const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const {getAllTasks,
	getTask,
	deleteTask,
	addTask,
	updateTask
} = require('../functions/tasks.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router.route('/').get(bodyParser.json(),getAllTasks).post(bodyParser.json(),addTask);
router.route('/:id').get(bodyParser.json(),getTask).patch(bodyParser.json(),updateTask).delete(bodyParser.json(),deleteTask);
module.exports = router;
