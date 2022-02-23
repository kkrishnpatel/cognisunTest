const express = require('express')

const { getTodoList,
    postTodo } = require('../controllers/todoControllers')

const router = express.Router()

router.get('/todo', getTodoList)
router.post('/todo', postTodo)

module.exports = router