import { Message } from "../models/messagebox.model.js";
export const userInterface=async(req,res)=>
{
     const data=await Message.find({listingId:req.body.listingId})
     console.log(data);
     return res.json({'r':data})
}
export const userInterfaceOne=async(req,res)=>
{
     const data=await Message.findOne({thirdParty:req.body.thirdParty});
     return res.json(data)
}