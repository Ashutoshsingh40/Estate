 import deletecloudinary from '../cloudinary/deletecloudinary.js'
 export const delcloudinary=async (req,res)=>
{
  try
  {
    console.log(req.body.public_id)
    await deletecloudinary(req.body.public_id);
    res.json({});
  }
  catch(err)
  {
    console.log(err)
  }
}