import express from 'express'
import {upload}  from '../multer/multer.js'
import { fileupload,create,checkuser,showlisting,edit,deleteListing,showone,mark,getbookmark,getbookmarks } from '../controller/Listing.controller.js';
const router=express.Router();
console.log('file')
router.post('/fileupload',upload.single('file'),fileupload)
router.post('/create',create);
router.post('/checkuser',checkuser);
router.post('/showlisting',showlisting);
router.post('/edit',edit);
router.post('/delete',deleteListing);
router.post('/showone',showone);
router.post('/bookmark',mark);
router.get('/getbookmark',getbookmark);
router.get('/getbookmarks',getbookmarks);
export default router;