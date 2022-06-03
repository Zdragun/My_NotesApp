import {taskVork} from '../controllers/tasks';
import { signup, login, isAuth } from '../controllers/auth.js';
const express = require('express');
const Router = express.Router();



/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Task endpoint
 */

/**
 * @swagger
 * /tasks:
 *  get:
 *    summary: Get all Tasks
 *    tags: [Tasks]
 */
Router.get('/tasks/by-user/:id',taskVork.getTasksByUserId)

/**
 * @swagger
 * /tasks/count:
 *  get:
 *    summary: get total tasks counter
 *    tags: [Tasks]
 */
Router.get('/tasks/count/:id',taskVork.getTaskCount)

/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *    summary: Get task by Id
 *    tags: [Tasks]
 */
Router.get('/tasks/:id',taskVork.getTask)

/**
 * @swagger
 * /tasks:
 *  post:
 *    summary: save a new Task
 *    tags: [Tasks]
 */
Router.post('/tasks',taskVork.saveTask)

/**
 * @swagger
 * /tasks/{id}:
 *  delete:
 *    summary: delete a task by Id
 *    tags: [Tasks]
 */
Router.delete('/tasks/:id',taskVork.deleteTask)

/**
 * @swagger
 * /tasks/{id}:
 *  put:
 *    summary: update a task by Id
 *    tags: [Tasks]
 */
Router.put('/tasks/:id',taskVork.updateTask)


Router.post('/login', login);

Router.post('/signup', signup);

Router.get('/private', isAuth);

Router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

// will match any other path
Router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

export default Router;