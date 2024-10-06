import {useState,useEffect} from 'react'
import MessageCard from '../Componet/MessageCard.jsx'
import {useParams}  from 'react-router-dom'
import {useSelector}  from  'react-redux'
function ThirdPartyMessageBox() {
  const {_id}=useParams()
  const user1=useSelector(state=>state.userStore.user)
  const [mes,setMes]=useState();
  async function Room()
  {
      const id=user1._id;
      const name=user1.username
      const listingId=_id;
      const thirdParty=(id+listingId);
      const res=await fetch('/api/interface/thirdparty',
        {
          'method':"POST",
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({listingId,thirdParty,name})
        }
      )
      const data=await res.json();
      console.log(data)
      setMes(data);
  }
  useEffect(()=>
  {
    Room()
  },[])
  return (
    <div>
       {
       mes?<div className='m-3'>
       <MessageCard data={mes}/>
       </div>:""
     }
    </div>
  )
}

export default ThirdPartyMessageBox