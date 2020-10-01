const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')


// CREATE task
router.post('/tasks', auth, async (req,res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send()
    }
})



// FETCH all tasks
// GET/tasks?completed=true
// GET/tasks?limit=10&skip=0
// GET/tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req,res) => {
    const match = {}
    const sort = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const tasks = await Task.find({ owner: req.user._id })  // option 1
        await req.user.populate({                                    // option 2
            
            path: 'tasks',
            match,
            options: {
                limit:      parseInt(req.query.limit),
                skip:       parseInt(req.query.skip),
                sort
            }
        }).execPopulate()       

        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})


// FETCH A TASK BY ID
router.get('/tasks/:id', auth, async (req,res) => {

    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.send(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// UPDATE
router.patch('/task/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error : 'Invalid updates!'})
    } 

    const _id = req.params.id
    const _task = req.params.body

    //console.log(_task)
    
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})


        // const task = await findByIdAndUpdate(_id, _task, { new: true, runValidators: true })
        
        if(!task) {
            return res.send('task not found')
        } 

        
        updates.forEach( (update) => task[update] = req.body[update] )
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// DELETE
router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        

        if(!task) {
            return res.status(404).send()
        }

        task.remove()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
} )


module.exports = router