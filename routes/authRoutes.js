import express from "express";
import storage from "../utils/storage";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({ storage });

router.get('/').post("/register", upload.single("picture"), register)