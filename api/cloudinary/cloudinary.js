import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET
});
    async function Cloudinary(uploaded_file)
   {
     try{
        const uploadDetail=await cloudinary.uploader.upload(uploaded_file)
        return uploadDetail;
     }
     catch(error){console.log(error)}
   }   
export default Cloudinary;