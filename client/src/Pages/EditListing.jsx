import { useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EditUser from '../Componet/EditUser.jsx'
function EditListing() {
    const{_id}=useParams()
    const id=useSelector(state=> state.userStore.user._id);
    const [checkuser,setCheck]=useState();
     async function userValidation()
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
          const {list,...rest}=data
          const list1=list.map(val=>{
            const{_id,...r}=val;
               return r
            })
            const b={...rest,list1}
            console.log(b)
          setCheck(b);
       }
       catch(err)
       {
        console.log(err);
       }
    }
    useEffect(()=>{
      userValidation();
    },[])
  return (
    <>
     {
        checkuser?<EditUser user={checkuser}/>:""
     }
     </>
  )
}
export default EditListing