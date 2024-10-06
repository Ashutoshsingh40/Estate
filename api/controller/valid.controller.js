import User from "../models/user.model.js";
import bcryptjs  from 'bcryptjs'
import jwt from 'jsonwebtoken';
export const signin=function (req,res)
{
    let{checkemail,checkpassword}=req.body;
    User.findOne({email:checkemail})
   .then((a)=>{
        if(a)
        {
          if(bcryptjs.compareSync(checkpassword,a.password))
          {
            const token =jwt.sign({id:a._id},process.env.JWT_SECRT)
            const r={_id:a._id,username:a.username,email:a.email,photo:a.photo}
            return res.cookie('access_token',token).json(
              {
                 r,
                "message":"Success"
              }
            )
          }
          else
          {
            return res.json({"message":"Invalid Email/Password"})
          }
           
        }
        else
        {
            return res.json({"message":"Invalid Email/Password"})
        }
   })
   .catch((r)=>res.json({"message":"error"}))
}
