import express from "express";
import  { getUser, getUserFriends, addRemoveFriends } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, 
            getUser).get("/:id/friends", verifyToken, getUserFriends);

router.patch("/:id: friendId", verifyToken, addRemoveFriends);

export default router;