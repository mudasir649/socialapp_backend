import jwt from "jsonwebtoken";
import { deniedResponse, successResponse, unexpectedResponse } from "../utils/Response.js";
import config from "../config/config.js";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if(!token){
            return deniedResponse();
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, config.jwt_secret);
        req.user = verified;
        next();

    } catch (error) {
        return unexpectedResponse(res, error, false)
    }
}