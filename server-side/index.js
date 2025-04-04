const express = require("express")
const mongoose = require("mongoose")

const app = express()
const userSchema = new mongoose.Schema({
    name : String,
    age : Number
})

const UserModel = mongoose.model("users", userSchema)

app.get("/getUsers", (req, res) => {
    UserModel.find({}).then(function(users){
        res.json(users)
    }).catch(function(err){
        console.log(err)
    })
})

mongoose.connect('mongodb://localhost:27017/local')

app.listen(3001, ()=> {
    console.log("server is running")
})