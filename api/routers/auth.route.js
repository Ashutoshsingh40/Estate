import express from 'express'
import {upload} from '../multer/multer.js';
import { signup,google,update,delete1,uploadPhoto} from '../controller/auth.controller.js';
const router=express.Router();
router.post("/signup",signup);
router.post('/google',google);
router.put('/update',update);
router.delete('/delete',delete1);
router.post('/uploadphoto',upload.single("file"),uploadPhoto)
export default router;