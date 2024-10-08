import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
function Show() {
    const[showlist,setShowList]=useState([])
    const id=useSelector(state=> state.userStore.user._id)
    async  function showListing()
    {
       try
       {
        const res=await fetch('/api/listing/showlisting',
          {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id})
          })
          const data= await res.json();
          setShowList(data.r);
          console.log(data.r)
       }
       catch(err)
       {
        console.log(err)
       }
    }
    useEffect(()=>{
        showListing()
    },[])
    async function deletelisting(e)
  {
    const res=await fetch('/api/listing/delete',
      {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({_id:e.target.value})
      })
      const data= await res.json();
      const a=showlist.filter(val=>{
            if(val._id!==e.target.value)
              return val;
      })
      setShowList(a);
  }
  return (
    <div>
        <h2 className='text-3xl font-bold text-center my-6'>Listings</h2> 
       <div className='ml-96 w-1/2'>
       {
          showlist.map(val=>
            (
              <div className='border-2 border-slate-200 my-2 rounded-md flex gap-20 items-center'>
              <Link to={`/listing/${val._id}`}><img src={val.list[0].url} className='m-4 h-24 w-40 cursor-pointer'/></Link>
              {
                val.name.length<=22?<Link to={`/listing/${val._id}`} className='w-48 text-lg  hover:underline'>{val.name}</Link>:<Link to={`/listing/${val._id}`} className='w-48 text-lg  hover:underline'>{val.name.substring(0,22)}...</Link>
              }
              <Link className='text-blue-600 hover:underline text-lg 'to={`/edit-listing/${val._id}`} >EDIT</Link>
              <button className='text-red-500 hover:underline text-lg ' value={val._id} onClick={deletelisting}>DELETE</button>
              </div>
             )
          )
        } 
       </div>   
    </div>
  )
}

export default Show