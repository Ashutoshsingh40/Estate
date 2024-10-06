import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/user.Slice.js'
import OAuth from '../Componet/OAuth.jsx'
function Signin() {
const[email,setEmail]=useState();
const[password,setPassword]=useState();
const navigate=useNavigate();
const dispatch=useDispatch();
function funSub(e)
{
  e.preventDefault();
  fetch('/api/valid/signin',{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({checkemail:email,checkpassword:password})
  }).then((res)=>res.json())
  .then((res)=>{
    dispatch(setUser(res));
     if(res.message==='Success')
     {
       navigate('/')
     }
  })
  .catch((res)=> dispatch(setUser(res)))
}
  return (
       <div className='max-w-md mx-auto'>
      <h1 className='text-center font-bold my-7 text-3xl'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={funSub}>
        <input type='email' className='border rounded-lg
         p-3' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' className='border rounded-lg 
        p-3' placeholder='Password'onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit' className='uppercase bg-slate-700
         text-white rounded-lg p-3 hover:bg-green-500
         hover:scale-105'>Sign In</button>
         <OAuth/>
      </form>
      <div className='flex justify-normal  py-3 gap-3'>
      <p>Donot Have an account?</p>
      <NavLink to='/sign-up' className='text-blue-700 underline'>Signup</NavLink>
     </div>
     <div>
     <h2 className='text-red-600'>{useSelector((state)=>state.userStore.userMessage)}</h2>
     </div>
     </div>
  )
}

export default Signin