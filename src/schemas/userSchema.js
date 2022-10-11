const { default: mongoose } = require("mongoose");

const useSchama = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hobby: {
        type: String,
        required: true
    }
})


module.exports.User = new mongoose.model('user', useSchama)