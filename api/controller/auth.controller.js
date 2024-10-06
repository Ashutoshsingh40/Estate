import User from '../models/user.model.js'
import bcryptjs  from 'bcryptjs'
export const signup= async (req,res)=>
{
    let {username,email,password}=req.body;
     if(password.length!=0)
     {
        password=bcryptjs.hashSync(password,10);
     }
    const newUser=User({username,email,password});
    try
    {
       await newUser.save();
       return res.json({'message':'true'})
    }catch(error)
    {
        return res.json({"message":error.name});
    }
}
export const google= async function(req,res)
{
     try
     {
        const{name,email,photo}=req.body;
        const a=await User.findOne({email:email})
           if(a)
           {
            const r={_id:a._id,username:a.username,email:a.email,photo:a.photo}
            return res.json({r,"message":"true"})
           }
           else
           {
            let password1=Math.floor(Math.random()*1000000).toString()
            password1=bcryptjs.hashSync(password1,10);
            let name1=name.split(" ").join("")+Math.floor((Math.random()*100000))
            const user=User({username:name1,email,password:password1,photo})
               const b=await user.save();
               const r={_id:b._id,username:name1,email,photo}
               return res.json({r,"message":"true"})
           }
     }
     catch(error)
     {
       console.log(error)
     }
     
}
export const update=async(req,res)=>
{
   let{id,username,email,password,photo}=req.body;
    try
    {
      
      const data= await User.findById({_id:id})
     if(password)
     {
        password=bcryptjs.hashSync(password,10);
        data.password=password
     }
     else
     {
      password=data.password
     }
     await User.updateMany({_id:id},{username,email,password,photo})
     const r={_id:id,username,email,photo}
     res.json({r,message:"Success"})
    }
    catch(err)
    {
      console.log(err)
    }
}
export const delete1= async (req,res)=>
{
    try
    {
      await User.deleteOne({_id:req.body.id});
      return res.json({r:null,message:""})
    }
    catch(err)
    {
      console.log(err)
    }
}
import Cloudinary from '../cloudinary/cloudinary.js';
import fs from 'fs'
export const uploadPhoto=(req,res)=>
{
   Cloudinary(req.file.path)
   .then(async (r1)=>{
      fs.unlink(req.file.path,()=>{})
       try
       {
         const jp=JSON.parse(req.body.jp);
        const b=jp.id
       await User.updateOne({_id:b},{photo:r1.url})
       const data=await User.findById({_id:b})
       const r={_id:data._id,username:data.username,email:data.email,photo:data.photo}
         return res.json({r,message:"Success"})
       }
       catch(err){console.log(err)}
   })
   .catch(err=>console.log(err))
}