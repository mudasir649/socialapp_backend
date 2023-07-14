import multer from "multer";
/* file storage */
export default function storage(){
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, "public/assets");
        },
        filename: function(req, file, cb){
            cb(null, file.originalname)
        }
    });
    const upload = multer({ storage });
    return upload.single("picture")
}
