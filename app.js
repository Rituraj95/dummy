const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const { User } = require('./src/schemas/userSchema')

app.use(express.urlencoded({
    extended: false
}))
app.use(cors())
app.use(express.json())
const DB = 'mongodb+srv://ankit:ankit501@cluster0.56wpfu7.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DB).then(() => {
    console.log("db connected")
}).catch((err) => {
    console.log(err.message);
})


app.get('/', async (req, res) => {
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
    console.log("Invoked")
    try {
        const id = req.params.id
        console.log(req.body)
        const result = await User.findByIdAndDelete(id);
        // res.sendStatus(200)
        res.json(result)
    }
    catch (err) {
        res.sendStatus(403)
        console.log(err.message)
    }
})

app.listen(process.env.PORT || 4000, () => {
    console.log("server started at http://localhost:4000")
})