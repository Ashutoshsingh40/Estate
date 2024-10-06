import {Message} from '../models/messagebox.model.js'
export const thirdparty=async(req,res)=>
{
    console.log(req.body.listingId)
    try
    {
         let data=await Message.findOne({thirdParty:req.body.thirdParty})
         if(data)
         {
             return res.json(data)
         }
         else
         {
              const mod=Message({listingId:req.body.listingId,thirdParty:req.body.thirdParty,name:req.body.name,messagebox:[]})
              data=await mod.save();
              console.log(data)
              return res.json(data)
         }
    }
    catch(err)
    {
        console.log(err)
    }
}
export const messagefun=async(req,res)=>
{
    try
    {
        const data=await Message.findOne({thirdParty:req.body.thirdParty});
        let list=(data!==null?data.messagebox:null)
        list.push(req.body.mess)
       const r= await Message.updateOne({thirdParty:req.body.thirdParty},{messagebox:list})
       return res.json({'response':r})
    }
    catch(err)
    {
        console.log(err)
    }
}