const express = require('express')
const UserController = require('../controllers/UserController')
const TaskController = require('../controllers/TaskController')
const router = express.Router()


//UserController
router.post('/register',UserController.register)
router.post('/login',UserController.login)


//TaskController
router.post('/store-task',TaskController.store)
router.get('/show-task',TaskController.show)
router.get('/view-task/:id',TaskController.view)
router.post('/update-task/:id',TaskController.update)
router.get('/delete-task/:id',TaskController.delete)












module.exports = router