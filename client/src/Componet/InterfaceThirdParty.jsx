import {useEffect,useState} from 'react'
import {useParams,useNavigate}  from 'react-router-dom'
import addlogo from '../assets/download (2).png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBed,faBath,faParking,faChair,faBookmark as solidBookmark} from '@fortawesome/free-solid-svg-icons';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { useSelector } from 'react-redux';
function InterfaceThirdParty() {
  const id=useSelector(state=>state.userStore.user._id)
  const {_id}=useParams()
  const [listing,setListing]=useState();
  const [bookMark,setBookMark]=useState(null);
  const Navigate=useNavigate();
  async function getData()
  {
    try
    {
      const res=await fetch('/api/listing/showone',
        {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({_id})
        })
        const data=await res.json();
        console.log(data)
        setListing(data)
    }
    catch(err)
    {
      console.log(err)
    }
  }
  async function getBook()
  {
     try
     {
      const res=await fetch(`/api/listing/getbookmark?_id=${id}&id=${_id}`)
      const data=await res.json();
      setBookMark(data.r)
     }
     catch(err)
    { console.log(err)}
  }
  useEffect(()=>{
     getData()
     getBook()
  },[])
  function navigateFun()
  {
    Navigate(`/listing/${_id}/messagebox`)
  }
  async function Book()
  {
     try
     {
         const res=await fetch('/api/listing/bookmark',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({'id':_id,'_id':id})
        })
        const data=await res.json();
        setBookMark(data.r)
     }
     catch(err)
     {
      console.log(err)
     } 
  }
  return (
    <div>
       {
         listing?<div className='flex flex-col gap-10'>
         <AwesomeSlider style={{height:610}} >
          {
            listing.list.map(mes=>(<div><img src={mes.url} style={{height:610}} className='w-screen'/></div>))
          }
         </AwesomeSlider>
       <div className='ml-80'>
        <div className='flex gap-1 items-center mb-5'>
          <h2 className='text-3xl font-semibold text-red-600'>{listing.name}</h2>
          <h2 className='text-2xl font-bold'>-</h2>
          <h2 className='text-2xl font-bold'>₹</h2>
          <h2 className='text-2xl font-semibold '>{listing.regular}</h2>
          {
            listing.sell?"":<h2 className='text-2xl font-semibold'>/ month</h2>
          }
        </div>
        <div className='flex gap-3 items-center mb-2'>
        <img src={addlogo} className='w-8 h-9 '/>
        <h3 className='text-md font-medium text-blue-500'>{listing.address}</h3>
        </div>
        <div className='flex gap-4 mb-4'>
          {
            listing.sell?<p className='w-48 p-2 text-center bg-red-600 rounded-lg text-white'>For Rent</p>:<p className='w-48 p-2 text-center bg-red-600 rounded-lg text-white'>For Rent</p>
          }
         {
          listing.offer?<p className='w-48 p-2 text-center
           bg-green-600 rounded-lg text-white'>₹{listing.discount} discount</p>
           :""
         }
         <div className='ml-8 mt-1 cursor-pointer' >
         {
          bookMark?(
             bookMark==='regular'? <FontAwesomeIcon icon={regularBookmark} onClick={Book} size='2x' />:
             <FontAwesomeIcon icon={solidBookmark} onClick={Book} size='2x' color='purple'/>):""
         }
         </div>
        </div>
        <div className='flex  text-center gap-2 mb-9'>
         <h2 className='text-lg font-medium '>Description -</h2>
         <h2 className=' text-start  text-gray-600' style={{width:640}}> {listing.description}</h2>
        </div>
        <div className='flex gap-8 mb-9'>
         <div className='flex gap-3 items-center'>
         <FontAwesomeIcon icon={faBed} size="2x" color="blue" />
         <h2 className='text-xl font-bold text-blue-600'>{listing.bed} Beds</h2>
         </div>
         <div className='flex gap-3 items-center'>
         <FontAwesomeIcon icon={faBath} size="2x" color="green" />
         <h2 className='text-xl font-bold text-green-600'>{listing.bath} Baths</h2>
         </div>
         <div className='flex gap-3 items-center'>
         <FontAwesomeIcon icon={faParking} size="2x" color="red" />
         {
           listing.parking?<h2 className='text-xl font-bold text-red-600'>Parking</h2>:
           <h2 className='text-xl font-bold text-red-600'> No Parking</h2>
         }
         </div>
         <div className='flex gap-3 items-center'>
         <FontAwesomeIcon icon={faChair} size="2x" color="black" />
         {
           listing.furnished?<h2 className='text-xl font-bold text-black'>Furnished</h2>:
           <h2 className='text-xl font-bold text-black'> Not Furnished</h2>
         }
         </div>
        </div>
        <div className='mb-8' >
          <button className='text-white text-center w-2/3 p-3 bg-yellow-500 rounded-lg' onClick={navigateFun}>Send Message</button>
        </div>
       </div>
         </div>:<div className='text-4xl font-bold text-black text-center mt-72'>Loading.....</div>
       }    
    </div>
  )
}

export default InterfaceThirdParty