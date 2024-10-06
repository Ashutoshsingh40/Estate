import {useState,useEffect} from 'react'
import {useParams,useLocation}  from 'react-router-dom'
import MessageCard from '../Componet/MessageCard.jsx'
function UserMessageBox() {
  const[input,setInput]=useState();
  const {_id}=useParams()
  const[list,setList]=useState([])
  const[color,setColor]=useState()
  async function Room()
  {
    const res=await fetch('/api/interface/user',
      {
        'method':"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({listingId:_id})
      }
    )
    const data=await res.json();
    console.log(data.r)
    setList(data.r)
  }
  useEffect(()=>{
    Room()
  },[])
  return (
    <div className='flex '>
  <div className=' overflow-y-scroll mt-2 bg-slate-300 border-collapse' style={{width:430, height:620}} >
  {
      list.map(mes=> 
        <h2  className='text-xl font-semibold cursor-pointer text-blue- py-3 px-6 
          rounded-lg ' onClick={(e)=>{setInput(mes)
         if(color)
         {
           color.style.background=''
         }
         setColor(e.target)
         e.target.style.background='yellow'}} >{mes.name}</h2>
      )
  }
  </div>
  
  <div className='flex flex-1 ' >
       {
        input?<MessageCard data={input}/>:<h2 className='text-7xl font-bold mx-24 my-56 text-sky-600'>Welcome to Chat Room...</h2>
       }
  </div>
  </div>
  )
}
export default UserMessageBox