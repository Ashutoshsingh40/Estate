import React from 'react'
import { useNavigate } from 'react-router-dom'
import addlogo from '../assets/download (2).png'
function Card(props) {
    const Navigate=useNavigate()
    console.log(props.data)
  return (
    <div className='w-80 h-auto bg-gray-50 border-2 border-black  rounded-xl cursor-pointer ' onClick={e=>{Navigate(`/listing/${props.data._id}`);}} >
       <div className='  flex flex-col gap-1 '>
       <img src={props.data.list.url} className=' w-80 h-64 rounded-lg  hover:shadow-2xl hover:animate-borderShadowColorChange '/>
       <div className=' flex  flex-col mx-3 my-2'>
       {
        props.data.name.length<=30?(<h2 className='text-lg font-semibold text-emerald-500
         first-letter:uppercase'>{props.data.name}</h2>):(<h2 className='text-lg font-semibold text-emerald-500
          first-letter:uppercase'>{props.data.name.substring(0,30)}....</h2>)
       }
       </div>
       <div className='flex  gap-3 items-center mx-3'>
          <img src={addlogo} className='w-7 h-7'/>
          {

            props.data.address.length<=30? (<p className='font-semibold first-letter:uppercase '>{props.data.address}</p>):
            (<p className='  font-semibold first-letter:uppercase '>{props.data.address.substring(0,30)}...</p>)
          }
        </div>
         
       <div className='mx-3'>
          <p className='text-sm text-gray-600 '>{props.data.description.length<=90?props.data.description:
          (props.data.description.substring(0,90)+'...')}</p> 
       </div>
       <div className=' my-1 mx-5 flex items-center '>
        <h2 className='text-2xl font-bold text-red-700'>₹{props.data.regular}</h2>
        {
           props.data.rent?<h2 className='text-xl font-light '>/month</h2>:""
        }
       </div>
       <div className='mx-4 my-2 flex gap-3 items-center'>
        <h2 className='text-md font-bold text-blue-700'>{props.data.bed}Bed</h2>
        <h2 className='text-md font-bold'>{props.data.bath}Bath</h2>
       </div>
       </div>
    </div>
  )
}

export default Card