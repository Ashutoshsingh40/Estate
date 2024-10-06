import express from 'express';
import { signin } from '../controller/valid.controller.js';
const router=express();
router.post('/signin',signin);
export default router;