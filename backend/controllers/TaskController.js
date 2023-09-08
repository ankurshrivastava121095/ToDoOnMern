const TaskModel = require("../models/Task")

class TaskController {

    static store = async(req,res) => {
        try{
            const { task } = req.body

            const data = new TaskModel({
                task: task
            })

            const isDataSaved = data.save()

            if (isDataSaved) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'Task Added Successfully.' })
            } else {
                res
                .status(401)
                .json({ 'status': 401, 'message': 'Error Try Again' }) 
            }
        }catch(err) {
            res
            .status(401)
            .json({ 'status': 401, 'message': err }) 
        }
    }

    static show = async(req,res) => {
        try{
            const data = await TaskModel.find()
            res.status(201)
            .json({ 
                success: true,
                data
            }) 
        }catch(err) {
            res
            .status(401)
            .json({ 'status': 401, 'message': err }) 
        }
    }

    static view = async(req,res) => {
        try{
            const data = await TaskModel.findById(req.params.id)
            res.status(201)
            .json({ 
                success: true,
                data
            }) 
        }catch(err) {
            res
            .status(401)
            .json({ 'status': 401, 'message': err }) 
        }
    }

    static update = async(req,res) => {
        try{
            const { task } = req.body

            const data = await TaskModel.findByIdAndUpdate(req.params.id,{
                task: task
            })

            if (data) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'Task Updated Successfully.' })
            } else {
                res
                .status(401)
                .json({ 'status': 401, 'message': 'Error Try Again' }) 
            }
        }catch(err) {
            res
            .status(401)
            .json({ 'status': 401, 'message': err }) 
        }
    }

    static delete = async(req,res) => {
        try{
            const data = await TaskModel.findByIdAndDelete(req.params.id)

            if (data) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'Task Deleted Successfully.' })
            } else {
                res
                .status(401)
                .json({ 'status': 401, 'message': 'Error Try Again' }) 
            }
        }catch(err) {
            res
            .status(401)
            .json({ 'status': 401, 'message': err }) 
        }
    }

}

module.exports = TaskController