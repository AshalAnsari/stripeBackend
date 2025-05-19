const Users = require("../model/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Tokens = require("../model/TokenModel")

const getUsers = async (req, res) => {
    try{
        const users = await Users.find()

        if(users.length > 0){
            return res.status(200).json({success: true, Message: "Users Found", users})
        }
        return res.status(400).json({success: false, Message: "No users exist currently"})
    }catch(err){
        return res.status(500).json({success:false, Message: "Internal server error i.e "+err})
    }
}

const createUser = async (req, res) => {
    try{
        const {
            username, 
            email,
            password
        } = req.body

        if(!email || !username || !password){
            return res.status(400).json({success: false, Message: "Username, Email, or Password is missing0"})
        }

        const doesUserExist = await Users.findOne({Email: email})

        if(doesUserExist){
           return res.status(200).json({success: false, Message: "User already exist!"})
        }

        bcrypt.hash(password, 10, async (err, result) => {
            if(err){
                return res.status(400).json({success: false, Message: err})
            }

            const user = new Users({Username: username, Email: email, Password: result})
            await user.save()

            if(user){
                return res.status(201).json({success: true, Message: "User created successfully", user})
            }
        })

    }catch(err){
        return res.status(500).json({success:false, Message: "Internal server error i.e "+err})
    }
}

const loginUser = async (req, res) => {
    try{
        const {
            email,
            password
        } = req.body

        if(!email || !password){
            return res.status(400).json({success: false, Message: "Email or Password is missing"})
        }

        const doesUserExist = await Users.findOne({Email: email})

        if(!doesUserExist){
            return res.status(400).json({success: false, Message: `User with the following email "${email}" doesn't exist`})
        }

        const doesPasswordMatch = await bcrypt.compare(password, doesUserExist.Password)

        if(doesPasswordMatch){
            jwt.sign({id: doesUserExist._id}, process.env.JWT_SECRET, {expiresIn:"2 days", audience:"web_app"}, async(err, token) => {
                if(err){
                    return res.status(400).json({success: false, Message: "User id is unavailable"})
                }

                const tokenModel = new Tokens({UserId:doesUserExist._id, Token:token})
                await tokenModel.save()

                return res.status(200).json({success: true, Message:"User signin successfull", token})
            })
        }
    }catch(err){
        return res.status(500).json({success:false, Message: "Internal server error i.e "+err})
    }
}


module.exports = {
    getUsers,
    createUser,
    loginUser,
}