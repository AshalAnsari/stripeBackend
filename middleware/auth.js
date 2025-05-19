const Tokens = require("../model/TokenModel")
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    try{
        let token = req.authorization.headers;
        if(!token){
            return res.status(400).json({success:false, Message: "You are not authorized!"});
        }
        token = token.split(" ")[1];

        const tokenModel = await Tokens.findOne({Token: token});
        if(tokenModel.Status == "invalid"){
            return res.status(400).json({success: false, Message: "You are not authorized!"});
        }

        jwt.verify(token, process.env.JWT_SECRET, async(err, authData) => {
            if(err){
                return res.status(400).json({success: false, Message: "token is not valid"});
            }

            req.body.id = authData.id;
            next();
        })

    }catch(err){
        return res.status(500).json({success: false, Message:`Internal Server Error i.e ${err}`})
    }
}

module.exports = auth;