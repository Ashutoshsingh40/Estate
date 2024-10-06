import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ThirdPartyMessageBox from '../Componet/ThirdPartyMessageBox.jsx'
import UserMessageBox   from '../Componet/UserMessageBox.jsx'
function MessageBox() {
    const {_id}=useParams()
    const id=useSelector(state=>state.userStore.user._id)
    const [check,setCheck]=useState();
    async function checkUserValid()
    {
        try
        {
          const res= await fetch('/api/listing/checkuser',
            {
              method:"POST",
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify({_id,id})
            }) 
            const data=await res.json();
            if(data===null)
              setCheck(-1)
            else
            setCheck(data);
        }
        catch(err)
        {
          console.log(err)
        }
    }
    useEffect(()=>{
      checkUserValid()
    },[])
  return (
    <>
    {
      check===-1?<ThirdPartyMessageBox/>:(check?<UserMessageBox/>:"")
    }
    </>
  )
}

export default MessageBox