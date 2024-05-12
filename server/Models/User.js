const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: String,
    status: String
})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel;