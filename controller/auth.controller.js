import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import config from "../config/config.js";
import { successResponse, failedResponse, unexpectedResponse } from "../utils/Response.js";


const signedToken = (userId, email) => {
    return jwt.sign(
        {userId, email},
        config.jwt_secret,
        { expiresIn: config.expiresIn }
    )
}


const register = async(req, res) => {
    const { firstName, lastName, email, password, confirmPassword, picturePath, friends, location, occupation, viewedProfile, impressions } = req.body;
    try {
        if(!(firstName && lastName && email && password)){
            return failedResponse(res, "All input fields cannot be empty.", false);
        }else{
            const salt = await bcrypt.genSalt();
            const encryptedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: encryptedPassword,
                picturePath,
                friends,
                location,
                occupation,
                viewedProfile: Math.floor(Math.random() * 10000),
                impressions: Math.floor(Math.random() * 1000)
            });
            const savedUser = await newUser.save();
            return successResponse(res, "User is registered successfully.", true, savedUser);
        }
    } catch (error) {
        return unexpectedResponse(res, error.message, false)
    }
}


const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.find({ email: email });
        if(!user) return failedResponse(res, "User does not exists.", false);
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) return failedResponse(res, "Invalid credentials.", false);
        const token = signedToken(user?._id, user?.email)
        delete user.password;
        return successResponse(res, "You are loggedIn", true, { token, user })
    } catch (error) {
        return unexpectedResponse(res, error.message, false)
    }
}

export {
    login,
    register
}