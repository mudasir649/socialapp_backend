import User from "../models/UserModel.js";
import Post from "../models/PostModel.js";
import { failedResponse, successResponse, unexpectedResponse } from "../utils/Response.js";

const createPost = async(req, res) => {
    try {
        const { userId, firstName, lastName, location, description, picturePath, userPicturePath, likes, comments } = req.body;
        // const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName,
            lastName,
            location,
            description,
            picturePath,
            userPicturePath,
            likes,
            comments
        });
        await newPost.save();
        const post = await Post();
        return successResponse(res, "", true, post);
    } catch (error) {
        return unexpectedResponse(res, 409, error.message, false)
    }
}

const getFeedPost = async(req, res) => {
    try {
        const post = await Post.find();
        return successResponse(res, "", true, post);
    } catch (error) {
        return unexpectedResponse(res, 404, error.message, false)
    }
}

const getUserPosts = async(req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({  userId });
        return successResponse(res, "", true, post)
    } catch (error) {
        return unexpectedResponse(res, 404, err.message, false)
    }
}

const likesPost = async(req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.find(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId)
        }else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            { likes: post.likes },
            {  new: true}
        );

        return successResponse(res, "Post like is updated successfully.", true, updatedPost);
    
    } catch (error) {
        return unexpectedResponse(res, 404, error.message, true);
    }
}

export {
    createPost,
    getFeedPost,
    getUserPosts,
    likesPost
}