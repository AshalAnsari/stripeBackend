const mongoose = require("mongoose")

const TokenSchema = new mongoose.Schema ({
    UserId:{
        type:String,
        required:true,
    },
    Token:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true,
        default:"valid"
    },
});

const Tokens = mongoose.model("Tokens", TokenSchema);

module.exports = Tokens;