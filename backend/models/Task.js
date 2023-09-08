const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var TaskModel = mongoose.model('tasks', taskSchema)

module.exports = TaskModel