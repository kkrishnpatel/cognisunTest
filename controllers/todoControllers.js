const todoModel = require('../models/todoModel')

const getTodoList = async (req, res) => {
    try {
        const data = await todoModel.find()
        res.status(200).send(data)
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

const postTodo = async (req, res) => {
    const { name, description, due, status } = req.body
    try {
        const data = new todoModel({
            name, description, due, status
        })
        await data.save();
        res.sendStatus(201)
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

module.exports = {
    getTodoList,
    postTodo
}