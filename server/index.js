const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./Models/User')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/crud');

app.get('/', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/create', (req, res) => {
    UserModel.create({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        status: req.body.status // Save the status field
    })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

// app.put('/update/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndUpdate({_id: id}, {
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age
//     }).then(user => res.json(user))
//     .catch(err => res.json(err))
// })
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        status:req.body.status
    }).then(user => res.json(user))
    .catch(err => res.json(err))
})


app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is Running");
})

app.get('/users/status/:status', (req, res) => {
    const status = req.params.status;
    UserModel.find({ status: status })
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

// API to get all users who have read a book (status is "read")
app.get('/users/read', (req, res) => {
    UserModel.find({ status: 'Read' })
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

// API to get all users who have not read a book (status is "not read")
app.get('/users/not-read', (req, res) => {
    UserModel.find({ status: 'To be Read' })
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});