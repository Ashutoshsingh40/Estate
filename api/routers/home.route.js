import express from "express";
import {getvalue} from '../controller/home.controller.js'
const router=express.Router()
router.get('/getvalue',getvalue);
export default router