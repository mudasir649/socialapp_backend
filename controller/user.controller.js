import User from "../models/UserModel";
import { failedResponse, successResponse, unexpectedResponse } from "../utils/Response";

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return successResponse(res, "", true, user)
    } catch (error) {
        return unexpectedResponse(res, error.message, false)
    }

}

const getUserFriends = async (req ,res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = Promise.all(
            user?.friends.map(id => User.findById(id))
        )
        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation , location, picturePath }) => {
            return  _id, firstName, lastName, occupation , location, picturePath;
        });
        return successResponse(res, "", true, formattedFriends)
    } catch (error) {
        return unexpectedResponse(res, error.message, false)
    }
}

const addRemoveFriends = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friends = await User.findById(friendId);

        if(user.friends.includes(friends)){
            user.friends = user.friends.filter(id => id !== friendId);
            user.friends = friends.friends.filter(id => id !== friendId);
        }else{
            user.friends.push(friendId);
            friends.friends.push(id)
        }
        await user.save();
        await friends.save();

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation , location, picturePath }) => {
            return  _id, firstName, lastName, occupation , location, picturePath;
        });
        return successResponse(res, "", true, formattedFriends)
    } catch (error) {
        return failedResponse(res, error.message, false)
    }
}

export { 
    getUser,
    getUserFriends,
    addRemoveFriends
}