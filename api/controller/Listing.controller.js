import Cloudinary from '../cloudinary/cloudinary.js';
import fs from 'fs'
export const fileupload=(req,res)=>
{
    console.log(req.file)
    Cloudinary(req.file.path)
   .then((r)=>{
      fs.unlink(req.file.path,()=>{})
      return  res.json({"url":r.url,"public_id":r.public_id})
   })
   .catch(err=>console.log(err))
}
 import { Listing } from '../models/listing.model.js';
export const create=async (req,res)=>
{
  try
  {
     const listing=Listing(req.body);
     const data= await listing.save();
      return res.json(data);
  }
  catch(err)
  {
   console.log(err)
  }
}
export const checkuser=async (req,res)=>
{
    try
    {
       const r=await Listing.findOne({_id:req.body._id,id:req.body.id});
       return res.json(r);
    }
    catch(err)
    {console.log(err)}
      
}
export const showlisting=async(req,res)=>
{
     try
     {
          const data= await Listing.find({id:req.body.id})
          return res.json({'r':data})
     }
     catch(err)
     {
      console.log(err)
     }
}
export const edit =async(req,res)=>
{
    try
    {
      const data=await Listing.updateMany({_id:req.body._id},{name:req.body.name,description:req.body.description,
         address:req.body.address,sell:req.body.sell,rent:req.body.rent,parking:req.body.parking,
         furnished:req.body.furnished,offer:req.body.offer,bed:req.body.bed,bath:req.body.bath,
         regular:req.body.regular,discount:req.body.discount,list:req.body.list})
       console.log(data)
       return res.json(data);
    }
    catch(err)
    {
      console.log(err)
    }
}
import deletecloudinary from '../cloudinary/deletecloudinary.js'
export const deleteListing=async(req,res)=>
{
    try
    {
      console.log(req.body._id)
   const data= await Listing.findOne({_id:req.body._id})
    data.list.map(async (val)=>
   {
      const del= await deletecloudinary(val.public_id)
   })
   const del=await Listing.deleteOne({_id:req.body._id})
    console.log(del)
    return res.json(del)
    }
    catch(err)
    {
      console.log(err)
    }
}
export const showone=async(req,res)=>
{
   const data=await Listing.findOne({_id:req.body._id})
   return res.json(data);
}
import {bookmark} from '../models/bookmark.model.js'
export const mark =async(req,res)=>
{
    try
    {
       const ex=await bookmark.findOne({userId:req.body._id})
       if(ex)
       {
         if(ex.list.includes(req.body.id)) 
         {
            let list;
            list=ex.list.filter(mes=>{
               if(mes!==req.body.id)
                  return mes
            })
            const data=await bookmark.updateOne({_id:ex._id},{list})
            return res.json({'r':'regular'})
         }
         else
         {
            let list;
            list=ex.list;
            list.push(req.body.id)
            const data=await bookmark.updateOne({_id:ex._id},{list})
            return res.json({'r':'solid'})
         }
       }
       else
       {
         let list=[];
         list.push(req.body.id)
          const value=bookmark({userId:req.body._id,list})
          const data=await value.save()
          return res.json({'r':'solid'})
       }
    }
    catch(err)
    {
      console.log(err)
    }
}
export const getbookmark=async(req,res)=>
{
    try
    {
      const ex=await bookmark.findOne({userId:req.query._id})
      if(ex)
      {
         if(ex.list.includes(req.query.id)) 
         {
            return res.json({'r':'solid'})
         }
         else
         {
            return res.json({'r':'regular'})
         }
      }
      else
      {
         return res.json({'r':'regular'})
      }
    }
    catch(err)
    {
      console.log(err)
    }
}
export const getbookmarks=async(req,res)=>
{
   try
   {
    const data=await bookmark.findOne({userId:req.query.userId})
   if(data)
   {
      let list=[];
      const promises = data.list.map(async (mes) => {
         const item = await Listing.findOne({ _id: mes });
               return item;
       });
       list = await Promise.all(promises); 
      const a=list.filter(mes=>
       {
           if(mes!==null)
           {
            return mes
           }
       }
       )
       const b=a.map(mes=>
       {
           return (String)(mes._id);
       }
       )
       const c=await bookmark.updateOne({_id:data._id},{list:b})
       console.log(c)
       return res.json({'r':a})
   }
   else
   {
      return res.json({'r':[]})
   }
   }
  catch(err)
  {
   console.log(err)
  }
}