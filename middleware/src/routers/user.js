const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/user')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')

// create user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()

        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

// login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

// logout
router.post('/users/logout' , auth, async (req, res) => {
    try {
        // filter out the active token
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send({
            message: 'success'
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

// logout all sessions
router.post('/users/logoutAll', auth, async (req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send('Logged out from all sessions')

    } catch (e) {
        res.status(500).send(e)
    }
})

// read all users
router.get('/users/me', auth ,async (req,res) => {
    res.send(req.user)
})

router.get('/users/:id', async (req,res) => {
    const _id = req.params.id

    try { 
        const user = await User.findById(_id)
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// update user
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error : 'Invalid updates!'})
    } 

    try {
        updates.forEach( (update) => req.user[update] = req.body[update] )
        await req.user.save()


        res.send(req.user)


    } catch (e) {
        res.status(500).send(e)
    }
})

// delete
router.delete('/users/me', auth, async (req, res) => {
    try {  
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch(e) {
        res.status(500).send(e)
    }
})

const multer = require('multer')
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload JPG, JPEG or PNG'))
        }

        cb(undefined, true)
    }
})

// upload user avatar
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    // req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    

    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()

    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        // check whether if user or avatar exists
        if (!user || !user.avatar) {
            throw new Error()
        }

        // set response header
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router