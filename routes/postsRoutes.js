import express from "express";
import { createPost, getFeedPost, getUserPosts, likesPost } from "../controller/posts.controller.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

/* READ */
router.get("/", verifyToken, 
                getFeedPost).get("/:userId/posts", verifyToken, getUserPosts);
router.post("/createPost", createPost);
/* UPDATE */ 
router.patch("/:id/like", verifyToken, likesPost);

export default router;