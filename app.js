const express = require('express')
const app = express()
const mongoose = require('mongoose')


app.use(express.urlencoded({
    extended: false
}))
const DB = 'mongodb+srv://ankit:ankit501@cluster0.0wt3ijf.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DB).then(() => {
    console.log("db connected")
}).catch((err) => {
    console.log(err.message);
})

app.get("/", (req, res) => {
    res.send("Nice")
})

app.post("/", async (req, res) => {
    const userSchema = new mongoose.Schema({
        name: {
            type: String
        }
    })
    const User = new mongoose.model('hero', userSchema);
    const user = User({
        name: 'ankit'
    });
    const result = await user.save();
    res.send(result)
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server started at http://localhost:3000")
})