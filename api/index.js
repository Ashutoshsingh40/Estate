import express from 'express'
import { Server } from 'socket.io';
import { createServer } from 'http';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import authrouter from './routers/auth.route.js'
import validrouter from './routers/valid.router.js'
import Listings from './routers/Listing.route.js'
import {delcloudinary} from './controller/delcloudinary.controller.js'
import { search } from './controller/search.controller.js'
import interface1 from './routers/interface.route.js'
import  home  from  './routers/home.route.js'
import path from 'path'
const app = express();
const server=createServer(app);
app.use(express.json())
mongoose.connect(process.env.MONGO)
.then(()=> console.log('connected'))
.catch((err)=>console.log(1));
const io=new Server(server,{
    cors:
    {
      origin:"http://localhost:5173",
      methods:["GET","POST"]
    }
  })
  const __dirname = path.resolve();
  app.use('/public', express.static(path.join(__dirname, 'api', 'public')));
app.use("/api/auth",authrouter)
app.use("/api/valid",validrouter)
app.use("/api/listing",Listings)
app.post('/api/deletecloudinary',delcloudinary);
app.get('/api/search',search);
app.use('/api/interface',interface1);
app.use('/api/home',home);
io.of('/api/socket').on('connection', (socket)=>
{
        socket.on('message',(data)=>{
          console.log(socket.id)
          io.of('/api/socket').emit(`${data.thirdParty}`,data.mess)   
        })
}
)
app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*',(req,res)=>
{
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

server.listen(3000,()=>
  {
      console.log('listen on 3000')
  })