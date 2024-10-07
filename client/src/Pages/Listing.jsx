import React from 'react'
import {useSelector}  from 'react-redux'
import { useState,useRef} from 'react'
import {useNavigate}  from 'react-router-dom'
function Listing() {
  const Navigate=useNavigate();
  const id=useSelector(state=>state.userStore.user._id)
  const[message,setMessage]=useState('');
  const[uploadFile,setuploadFile]=useState(0);
  const[file,setFile]=useState();
  const[update,setUpdate]=useState({});
  const upd=useRef(null)
  const[name,setName]=useState();
  const[description,setDesc]=useState();
  const[address,setAddress]=useState();
  const[sell,setSell]=useState(false);
  const[rent,setRent]=useState(true);
  const[parking,setParking]=useState(false);
  const[furnished,setFurnished]=useState(false);
  const[offer,setOffer]=useState(false);
  const[bed,setBed]=useState(1);
  const[bath,setBath]=useState(1);
  const[regular,setRegular]=useState(0);
  const[discount,setDiscount]=useState(0);
  const[list,setlist]=useState([]);
  async function fileUpl()
  {
      if(file)
      {
        if(uploadFile<6)
          {
                 try
                 {
                  const formdata=new FormData();
                  formdata.append('file',file)
                  console.log(file)
                  const res =await fetch('/api/listing/fileupload',{
                    method:'POST',
                    body:formdata
                  })
                  const data=await res.json();
                  setlist(prev=>[...prev,data])
                 }
                 catch(err)
                 {
                  console.log(err)
                 }
                setuploadFile(uploadFile+1)
              }
          else
          {
                console.log(1)
          }
      }
  }
 async   function deleteFile(e)
  {
    try
    {
     const res= await fetch('/api/deletecloudinary',
           {
             method:"POST",
             headers:{'Content-Type':'application/json'},
             body:JSON.stringify({public_id:e.target.value})
           }
         )
         const a=list.filter(val=>{
           if(val.public_id!==e.target.value)
            return val;
         })
         setuploadFile(uploadFile-1)
      setlist(a);
    }
    catch(err)
    {
      console.log(err)
    }
  }
  async function updFile(e)
   {
     try
     {
      const a=e.target.files[0];
      const formdata=new FormData();
      formdata.append('file',a)
      const res =await fetch('/api/listing/fileupload',{
        method:'POST',
        body:formdata
      })
      const data=await res.json();
      const res1= await fetch('/api/deletecloudinary',
        {
          method:"POST",
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({public_id:update.public_id})
        })
       const temp=list.map(v=>
        {
           if(v.public_id!==update.public_id)
            return v;
           else
           return data;
        })
        setUpdate('');
        console.log(temp);
        setlist(temp);
     }
     catch(err)
     {
      console.log(err)
     }
   }
  function updateFile(e)
  {
        list.map(val=>{
         if(val.public_id===e.target.value)
         {
          setUpdate(val);
            upd.current.click() 
         }
       }) 
  }
  function sellChange(e)
  {
       if(e.target.value)
       {
           setSell(true);
           document.getElementById('r').checked = false;
           setRent(false);
       }
       else
       {
          setSell(false);
       }
  }
  function rentChange(e)
  {
    if(e.target.value)
      {
          setRent(true);
          document.getElementById('s').checked = false;
          setSell(false);
      }
      else
      {
         setRent(false);
      }
  }
  async function createListing()
   {
      console.log(uploadFile)
        if(!name)
          setMessage('Name must be fill') 
        else if(!description)
          setMessage('Description must be fill')
        else if(description.length<60)
          setMessage('Description size must be greater than 60')
        else if(!address)
          setMessage('Address must be fill')
        else if(bath>10)
         setMessage('Number of BathRoom must be less than 10')
        else if(bed>10)
          setMessage('Number of BedRoom must be less than 10')
        else if(regular==0)
          setMessage('Price must be greater than 0')
        else if(offer&&discount==0)
        setMessage('Price must be greater than 0')
       else if(uploadFile===0)
        setMessage('Must have Atleast one  image')
      else
      {
        try
        {
          setMessage('');
        const r={name,description,address,sell,rent,parking,furnished,offer,bed,bath,regular,discount,list,id}
       const res=await fetch('/api/listing/create',
          {
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(r)
          })
        const data=await res.json();
        console.log(data);
        Navigate(`/listing/${data._id}`);
        }
        catch(err){console.log(err)}
      }
   }
   
  return (
       <div className='my-7 max-w-4xl mx-auto flex flex-col gap-8'>
           <h1 className=' text-center text-3xl font-extrabold uppercase '>create a listing</h1>
           <p className='text-center text-lg text-red-400 '>{message}</p>     
           <from className=' flex flex-row gap-4' >
      <div className='flex flex-col gap-4 flex-1'>
             <div className='flex flex-col gap-3'>
              <input type='text' placeholder='Name' className='p-3 rounded-lg border-2' 
              onChange={e=>setName(e.target.value)} required/>
               <textarea className='p-4 rounded-lg border-2'
                placeholder='Description 'onChange={e=>setDesc(e.target.value)} required/>
               <input type='text' placeholder='Address' className='p-3 rounded-lg border-2'
                 onChange={e=>setAddress(e.target.value)} required />
             </div>
             <div className='flex gap-6 '>
                 <div  className='flex flex-row gap-2 items-center'>
                <input id='s' type='checkbox'  className='size-5' onChange={sellChange} />
                <span> Sell</span>
                </div>
                <div  className='flex flex-row gap-2 items-center'>
                <input  id='r' type='checkbox'  className='size-5' defaultChecked={true} onChange={rentChange} />
                <span> Rent</span>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                <input type='checkbox' className='size-5' onChange={e=>setParking(e.target.checked)}/>
                <span> Parking spot</span>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                <input type='checkbox' className='size-5' onChange={e=>setFurnished(e.target.checked)} />
                <span> Furnished</span>
                </div>
             </div>
             <div className='flex flex-row gap-2 items-center'>
                <input type='checkbox' className='size-5'  onChange={e=>setOffer(e.target.checked)} />
                <label> Offer</label>
              </div>
              <div  className='flex  flex-row gap-14'>
                  <div className='flex flex-row gap-3 items-center'>
                  <input type='number' max={10} min={1} className=' p-3 
                   rounded-lg border-2' defaultValue={1} required onChange={e=>setBed(e.target.value)} />
                  <span>Beds</span>
                  </div>
                  <div className='flex flex-row gap-3 items-center'>
                  <input type='number' max={10} min={1} className='
                   p-3 rounded-lg border-2' defaultValue={1} required
                    onChange={e=>setBath(e.target.value)}/>
                  <span>Baths</span>
                  </div>
                 </div>
                 <div className='flex flex-row gap-3 items-center'>
                  <input type='number' min={0} className='p-3 rounded-lg w-28'
                  defaultValue={0} required onChange={e=>setRegular(e.target.value)}/>
                  <span>Regular price</span>
                 </div>
                  {offer?<div className='flex flex-row gap-3 items-center'>
                  <input type='number' min={0} className='p-3 rounded-lg w-28'
                   defaultValue={0} onChange={e=>setDiscount(e.target.value)}/>
                  <span>Discounted price</span>
                 </div>:''} 
              
     </div>
        <div className='flex flex-col gap-4 flex-1'>
           <div>
            <span className='font-medium'>Images:</span>
            <span>The first image will be the cover (max 6)</span>
           </div>
           <div className='flex flex-row gap-6 items-center'>
            <input type='file' className='border-2 border-blue-300 p-3'
             onChange={e=>setFile(e.target.files[0])}/>
            <button className='border-2 border-black p-3 rounded-md bg-green-500'
             onClick={fileUpl}>UPLOAD</button>
           </div>  
         {
          uploadFile<=2?<div> {
             list.map(li=>{
              return(
                <div className='flex flex-row gap-8 items-center  rounded-lg bg-slate-200 border-2 border-slate-400'>
                <img src={li.url} className='w-44 h-24 rounded-md m-4 border-2 border-slate-600'/>
                <button className='uppercase  p-2 bg-cyan-400 rounded-md' value={li.public_id} onClick={updateFile}>Update</button>
                <button className='p-2 bg-red-400 rounded-md uppercase' value={li.public_id} onClick={deleteFile}>Delete</button>
                </div>
              )
             })}</div>:<div className='overflow-y-scroll ' style={{height:263}}>
             {
             list.map(li=>{
              return(
                <div className='flex flex-row gap-8 items-center  rounded-lg bg-slate-200 border-2 border-slate-400'>
                <img src={li.url} className='w-44 h-24 rounded-md m-4 border-2 border-slate-600'/>
                <button className='uppercase  p-2 bg-cyan-400 rounded-md' value={li.public_id} onClick={updateFile}>Update</button>
                <button className='p-2 bg-red-400 rounded-md uppercase' value={li.public_id} onClick={deleteFile}>Delete</button>
                </div>
              )
             })}
             </div>
         }
             <input type='file' hidden ref={upd} onChange={updFile}/>
           <button  className='bg-red-700 uppercase rounded-lg text-white p-4 
           text-center cursor-pointer' onClick={createListing}>create listing</button>   
       </div>
           </from>
       </div>
  )
}
export default Listing