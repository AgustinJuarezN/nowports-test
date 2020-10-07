const express = require('express');
const UserController = require('../controllers/user.controller');

const UserRouter = express.Router();
UserRouter.post('/', UserController.createUser);

module.exports = UserRouter;
