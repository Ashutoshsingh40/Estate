import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup}  from 'firebase/auth'
import {app}  from '../firebase.js'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/user.Slice.js'
import { useNavigate } from 'react-router-dom'
function OAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
 const handleGoogleClick=async function ()
    {
      try
      {
        const provider = new GoogleAuthProvider()
        const auth=getAuth(app)
        const result=await signInWithPopup(auth,provider)
        const res=await fetch('/api/auth/google',
            {
                method:'POST',
                headers:{'Content-Type':"application/json"},
                body:JSON.stringify({name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                })
            }
        )
        const data=await res.json();
        dispatch(setUser(data))
        navigate('/')
      }
      catch(error)
      {
        console.log(error)
     }
    }
  return (
         <button onClick={handleGoogleClick} type='button' className='uppercase bg-black
         text-white rounded-lg p-3 hover:bg-lime-400
         hover:scale-105'>Continue with google</button>
  )
}

export default OAuth