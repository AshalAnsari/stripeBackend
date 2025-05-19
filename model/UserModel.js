const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    Username: {
        type: String, 
        required: true,
    },
    Email:{
        type: String, 
        unique: true,
        required: true,
    },
    Password:{
        type: String, 
        required: true,
    },
    Phone:{
        type:String
    },
    Image:{
        type:String
    },
    UserType:{
        type:String, 
        default:"buyer"
    },
    Status:{
        type:String,
        default:"Not-Verified"
    }
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel;