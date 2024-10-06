import express from 'express'
import {thirdparty,messagefun} from '../controller/thirdparty.controller.js'
import {userInterface,userInterfaceOne} from '../controller/userinterface.controller.js'
const routes=express.Router();
routes.post('/thirdparty',thirdparty)
routes.post('/message',messagefun)
routes.post('/user',userInterface)
routes.post('/userdetail',userInterfaceOne)
export default routes;
