const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const { User } = require('./src/schemas/userSchema')
require('dotenv').config()
app.use(express.urlencoded({
    extended: false
}))
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log("db connected")
}).catch((err) => {
    console.log(err.message);
})


app.get('/data', async (req, res) => {
    const data = await User.find()
    res.send(data)
})

app.post("/", async (req, res) => {
    try {
        const { name, phoneNumber, email, hobby } = req.body;

        const user = User({
            name,
            phoneNumber,
            email,
            hobby
        })

        const result = await user.save();
        res.sendStatus(201)

    } catch (error) {
        res.sendStatus(405)
    }

})

app.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const result = await User.findByIdAndDelete(id);
        // res.sendStatus(200)
        res.json(result)
    }
    catch (err) {
        res.sendStatus(403)
    }
})

app.put("/", async (req, res) => {
    console.log("updaterequested")
    console.log(req.body)
    const id = req.body._id;
    try {
        await User.findByIdAndUpdate(id, req.body)
        res.sendStatus(200)
    }
    catch (err) {
        res.sendStatus(403)
    }
})

app.listen(process.env.PORT || 4000, () => {
    console.log("server started at http://localhost:4000")
})