import React from 'react'
import {NavLink ,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import OAuth from '../Componet/OAuth.jsx';
function Signup() {
 const[username,setUser]=useState('');
 const[email,setEmail]=useState('');
 const[password,setPassword]=useState('');
 const[message,setMessage]=useState();
 const Navigate=useNavigate()
 function funSubmit(e)
 {
    e.preventDefault();
     fetch('/api/auth/signup',{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({username,email,password})
    }).then((res)=>res.json())
    .then((res)=>{
      if(res.message!=='true')
        setMessage(res.message)
        else
      Navigate('/sign-in')
    })
    .catch((res)=>console.log(res))
 }
  return (
    <div className='max-w-lg mx-auto '>
    <h1 className='text-center text-3xl font-bold my-8'>Sign Up</h1>
     <form className=' flex flex-col gap-5' onSubmit={funSubmit}>
     <input type='text' placeholder='Username'
      className='border p-3 rounded-lg' id='Username'
      onChange={(e)=>(setUser(e.target.value))}
      />
     <input type='email' placeholder='Email' 
     className='border p-3 rounded-lg' id='Email'
     onChange={(e)=>(setEmail(e.target.value))}
     />
     <input type='password' placeholder='Password' 
     className='border p-3 rounded-lg' id='Password'
     onChange={(e)=>(setPassword(e.target.value))}
     />
     <button  type='submit'className='bg-slate-700 text-white p-3 
     rounded-lg uppercase hover:scale-105 hover:bg-red-500'>Sign Up</button>
     <OAuth/>
     </form>
     <div>
      <h1 className='text-red-600 font-bold '>{message}</h1>
     </div>
     <div className='flex justify-normal  py-3'>
      <p>Have an account?</p>
      <NavLink to='/sign-in' className='text-blue-700 underline'>Signin</NavLink>
     </div>
    </div>
  )
}

export default Signup