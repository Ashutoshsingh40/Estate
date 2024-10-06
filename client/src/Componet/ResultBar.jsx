import React, { useState,useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Card from '../Componet/Card.jsx'
function ResultBar() {
  
const[data,setData]=useState([])
const [searchParams]=useSearchParams();
 function search_fun()
{
   fetch(`/api/search?searchterm=${searchParams.get('searchterm')}&type=${searchParams.get('type')}&offer=${searchParams.get('offer')}&parking=${searchParams.get('parking')}&furnished=${searchParams.get('furnished')}&sort=${searchParams.get('sort')}`)
  .then(res=>res.json())
  .then(res=>{
    setData(res.r)
  })
}
useEffect(()=>{
 
    if(searchParams.size)
    {
       search_fun()
    }
  },[searchParams])
  return (
   <div className='flex-1 border-x-2'>
      <div className='flex-col '>
      <h1 className='p-5 text-5xl text-indigo-400 font-bold text-center border-y-2 border-collapse'>Listing Results</h1>
     <div className='flex py-10 px-6 gap-9 flex-wrap'>
      { 
        data.map(d=><Card data={d}/>)
      }
     </div>
     </div>
   </div>
  )
}
export default ResultBar