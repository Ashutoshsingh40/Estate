import React, { useRef ,useState} from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import { useNavigate,Link} from 'react-router-dom';
import { setUser } from '../redux/user.Slice';
function Profile() {
  const user1=useSelector(state=> state.userStore.user)
  const val=useRef(null);
  const[username,setUsername]=useState(user1.username)
  const[email,setEmail]=useState(user1.email)
  const[password,setPassword]=useState()
  const[photo,setPhoto]=useState()
  const[showlist,setShowList]=useState([])
  const Navigate=useNavigate()
  const dispatch=useDispatch()
 function setChange(e)
 {
     const a=e.target.files[0]
     if(a)
     {
      const formdata= new FormData()
      formdata.append('file',a)
      console.log(user1._id)
      formdata.append('jp',JSON.stringify({id:user1._id}))
    fetch('/api/auth/uploadphoto',{
      method:'POST',
      body:formdata
    }).then(r1=>r1.json())
      .then(r1=>{
        dispatch(setUser(r1))
      })
     }
 }
  function uploadPhoto()
  {
    val.current.click()
  }
  function changeRou()
  {
    Navigate('/sign-in')
   dispatch(setUser({r:null,message:""}))
  }
  function updateDetail()
  {
    
     fetch('/api/auth/update',{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id:user1._id,username,email,password,photo:user1.photo})
     })
     .then(res=>res.json())
     .then(res=>dispatch(setUser(res)))
     .catch(res=>console.log(res))
  }
 async function deleteUser()
  {
     try
     {
     await fetch('/api/auth/delete',
        {
          method:"DELETE",
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({id:user1._id})
        }
      )
      Navigate('/sign-up')
      dispatch(setUser({r:null,message:""}))
     }
     catch(err)
     {
      
      console.log(err)
     }
  }
  function createListing()
  {
    Navigate('/listing')
  }
  return (
    <div>
      <div className='max-w-md mx-auto'>
      <div className=' mt-5'>
      <h1 className='text-3xl font-bold text-center '>Profile</h1>
      <div className='my-5 grid place-content-center gap-3'>
      <input type='file' hidden ref={val}  onChange={setChange}/>
      <img src={user1.photo} className='rounded-full w-28 h-28 
      cursor-pointer' onClick={uploadPhoto}/>
      </div>
      </div>
      <div className='flex flex-col gap-2'>
        <input type='text' placeholder='Username' className='p-3 
        rounded-lg' defaultValue={user1.username} onChange={e=>setUsername(e.target.value)}/>
        <input type='email'  placeholder='Email' className='p-3 
        rounded-lg' defaultValue={user1.email}onChange={e=>setEmail(e.target.value)}/>
        <input type='password' placeholder='Password'
         className='p-3 rounded-lg' onChange={e=>setPassword(e.target.value)} />
        <button className='p-3 bg-yellow-500 cursor-pointer rounded-xl
         text-white text-lg' onClick={updateDetail}>UPDATE</button>
          <button className='p-3 bg-teal-400 cursor-pointer
           rounded-xl uppercase text-lg' onClick={createListing}>create listing</button>
            <Link className=' text-center text-lg text-white p-3 rounded-xl bg-red-600 cursor-pointer' to={'/showlisting'}>Show Listings</Link>
            <Link className=' text-center text-lg text-white p-3 rounded-xl bg-black cursor-pointer' to={'/showbookmarks'}>BookMarks</Link>
          </div>
      <div className='flex justify-between my-3'>
        <p className='text-red-600 cursor-pointer 
        hover:underline ' onClick={deleteUser}>Delete Account</p>
        <p className='text-red-600 cursor-pointer 
        hover:underline' onClick={changeRou}>Sign out</p>
      </div>
               
      </div>
    </div>
  )
}

export default Profile