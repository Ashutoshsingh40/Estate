import React from 'react'
import {useSelector}  from 'react-redux'
import { useState,useRef} from 'react'
import {useNavigate}  from 'react-router-dom'
export default function EditUser(props) {
  const Navigate=useNavigate();
  const id=useSelector(state=>state.userStore.user._id)
  const[message,setMessage]=useState('');
  const[uploadFile,setuploadFile]=useState(props.user.list1.length);
  const[file,setFile]=useState();
  const[update,setUpdate]=useState({});
  const upd=useRef(null)
  const[name,setName]=useState(props.user.name);
  const[description,setDesc]=useState(props.user.description);
  const[address,setAddress]=useState(props.user.address);
  const[sell,setSell]=useState(props.user.sell);
  const[rent,setRent]=useState(props.user.rent);
  const[parking,setParking]=useState(props.user.parking);
  const[furnished,setFurnished]=useState(props.user.furnished);
  const[offer,setOffer]=useState(props.user.offer);
  const[bed,setBed]=useState(props.user.bed);
  const[bath,setBath]=useState(props.user.bath);
  const[regular,setRegular]=useState(props.user.regular);
  const[discount,setDiscount]=useState(props.user.discount);
  const[list,setlist]=useState(props.user.list1);
  async function fileUpl()
  {
      if(file)
      {
        if(uploadFile<6)
          {
            console.log(file)
                 try
                 {
                  const formdata=new FormData();
                  formdata.append('file',file)
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
 async function deleteFile(e)
  {
    try
    {
      console.log(e.target.value)
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
  async function editListing()
   {
      console.log(uploadFile)
        if(!name)
          setMessage('Name must be fill') 
        else if(!description)
          setMessage('Description must be fill')
        else if(!address)
          setMessage('Address must be fill')
        else if(bath>10)
         setMessage('Number of BathRoom must be less than 10')
        else if(bed>10)
          setMessage('Number of Room must be less than 10')
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
        const r={name,description,address,sell,rent,parking,furnished,offer,bed,bath,regular,discount,list,id,_id:props.user._id}
       const res=await fetch('/api/listing/edit',
          {
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(r)
          })
        const data=await res.json();
        console.log(data);
        Navigate(`/listing/${props.user._id}`);
        }
        catch(err){console.log(err)}
      }
   }
  return (
    <div className='my-7 max-w-4xl mx-auto flex flex-col gap-8'>
    <h1 className=' text-center text-3xl font-extrabold uppercase text-red-700'>edit a listing</h1>
    <p className='text-center  text-black '>{message}</p>     
    <from className=' flex flex-row gap-4'>
<div className='flex flex-col gap-4 flex-1'>
      <div className='flex flex-col gap-3'>
       <input type='text' placeholder='Name' className='p-3 rounded-lg border-2' 
       onChange={e=>setName(e.target.value)} defaultValue={props.user.name}/>
        <textarea className='p-4 rounded-lg border-2'
         placeholder='Description 'onChange={e=>setDesc(e.target.value)} required
          defaultValue={props.user.description}/>
        <input type='text' placeholder='Address' className='p-3 rounded-lg border-2'
          onChange={e=>setAddress(e.target.value)} defaultValue={props.user.address} />
      </div>
      <div className='flex gap-6 '>
          <div  className='flex flex-row gap-2 items-center'>
         <input id='s' type='checkbox' defaultChecked={props.user.sell} 
         className='size-5' onChange={sellChange} />
         <span> Sell</span>
         </div>
         <div  className='flex flex-row gap-2 items-center'>
         <input  id='r' type='checkbox'  className='size-5'
          defaultChecked={props.user.rent} onChange={rentChange} />
         <span> Rent</span>
         </div>
         <div className='flex flex-row gap-2 items-center'>
         <input type='checkbox' className='size-5' defaultChecked={props.user.parking} 
          onChange={e=>setParking(e.target.checked)}/>
         <span> Parking spot</span>
         </div>
         <div className='flex flex-row gap-2 items-center'>
         <input type='checkbox' className='size-5'  defaultChecked={props.user.furnished} 
         onChange={e=>setFurnished(e.target.checked)} />
         <span> Furnished</span>
         </div>
      </div>
      <div className='flex flex-row gap-2 items-center'>
         <input type='checkbox' className='size-5'  defaultChecked={props.user.offer} onChange={e=>setOffer(e.target.checked)} />
         <label> Offer</label>
       </div>
       <div  className='flex  flex-row gap-14'>
           <div className='flex flex-row gap-3 items-center'>
           <input type='number' max={10} min={1} className=' p-3 
            rounded-lg border-2' defaultValue={props.user.bed} required  onChange={e=>setBed(e.target.value)} />
           <span>Beds</span>
           </div>
           <div className='flex flex-row gap-3 items-center'>
           <input type='number' max={10} min={1} className='
            p-3 rounded-lg border-2' defaultValue={props.user.bath} required
             onChange={e=>setBath(e.target.value)}/>
           <span>Baths</span>
           </div>
          </div>
          <div className='flex flex-row gap-3 items-center'>
           <input type='number' min={0} className='p-3 rounded-lg w-28'
           defaultValue={props.user.regular} required onChange={e=>setRegular(e.target.value)}/>
           <span>Regular price</span>
          </div>
           {offer?<div className='flex flex-row gap-3 items-center'>
           <input type='number' min={0} className='p-3 rounded-lg w-28'
            defaultValue={props.user.discount} onChange={e=>setDiscount(e.target.value)}/>
           <span>Discounted price</span>
          </div>:''} 
       
</div>
 <div className='flex flex-col gap-4 flex-1'>
    <div>
     <span className='font-medium'>Images:</span>
     <span>The first image will be the cover (max 6)</span>
    </div>
    <div className='flex flex-row gap-6 items-center'>
     <input type='file' className='border-2 border-yellow-300 p-3'
      onChange={e=>setFile(e.target.files[0])}/>
     <button className='text-white border-2 border-black p-3 rounded-md bg-blue-500'
      onClick={fileUpl}>UPLOAD</button>
    </div>  
    {
      uploadFile<=2?<div>  {
      list.map(li=>{
       return(
         <div className='flex flex-row gap-8 items-center  rounded-lg bg-violet-100 border-2 border-slate-400'>
         <img src={li.url} className='w-44 h-24 rounded-md m-4 border-2 border-slate-600'/>
         <button className='uppercase  text-white p-2 bg-lime-500 rounded-md' value={li.public_id} onClick={updateFile}>Update</button>
         <button className='p-2 text-white bg-black rounded-md uppercase' value={li.public_id} onClick={deleteFile}>Delete</button>
         </div>
       )
      })
    }</div>:<div className='overflow-y-scroll ' style={{height:263}}>
    {
      list.map(li=>{
       return(
         <div className='flex flex-row gap-8 items-center  rounded-lg bg-violet-100 border-2 border-slate-400'>
         <img src={li.url} className='w-44 h-24 rounded-md m-4 border-2 border-slate-600'/>
         <button className='uppercase  text-white p-2 bg-lime-500 rounded-md' value={li.public_id} onClick={updateFile}>Update</button>
         <button className='p-2 text-white bg-black rounded-md uppercase' value={li.public_id} onClick={deleteFile}>Delete</button>
         </div>
       )
      })
    }
    </div>
    }
  
    <input type='file' hidden ref={upd} onChange={updFile}/>
    <button  className='bg-green-600 uppercase rounded-lg text-white p-4 
    text-center cursor-pointer' onClick={editListing} >edit listing</button>   
</div>
    </from>
</div>
  )
}
