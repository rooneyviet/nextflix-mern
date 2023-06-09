import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken"
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
    console.log(`signup api`);
    
    try {
        console.log(`signup api 1`);
        console.log('Got body:', req.body);
        const {username, password, displayName} = req.body;

        console.log(`${username} ${password} ${displayName}`);

        const checkUser = await userModel.findOne({username});
        if(checkUser) {
            return responseHandler.badRequest(res, "User already used")
        }
        const user= new userModel();

        user.displayName = displayName;
        user.username  =username;
        user.setPassword(password);

        console.log(`Please 1`);

        await user.save();

        console.log(`Please 2`);

        const token = jsonwebtoken.sign(
            {data: user.id},
            process.env.TOKEN_SECRET,
            {expiresIn: "24h"}
        )

        console.log(`Please 3`);

        return responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id
        });
        
    }catch {
        responseHandler.error(res);
        console.log(`Error!!!`);
    }
};

const signin = async (req, res) => {
    try {

        const {username, password} = req.body;
        const user = await userModel.findOne({username}).select("username password salt id displayName");

        if(!user) return responseHandler.badRequest(res, "User not exists");
    

        if(!user.validPassword(password)) return responseHandler.badRequest(res, "Wrong username or password");

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
          );

        user.password = undefined;
        user.salt =undefined;

        return responseHandler.ok(res, {
            token,
            ...user._doc,
            id: user.id
        });
        
    } catch {
        responseHandler.error(res);
    }
};


const updatePassword = async (req, res) => {
    try {
            const {password, newPassword} = req.body;

            const user = await userModel.findById(req.user.id).select("password id salt");

            if(!user) return responseHandler.unauthorized(res);

            if(!user.validPassword(password)) return responseHandler.badRequest(res, "Wrong password");

            user.setPassword(newPassword);

            await user.save();

            responseHandler.ok(res);
    }catch {
        responseHandler.error(res);
    }
};


const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);

        if(!user) return responseHandler.notfound(res, "User not found");

        responseHandler.ok(res, user);
    } catch {
        responseHandler.error(res);
    }
};


export default {
    signup,
    signin,
    getInfo,
    updatePassword
};