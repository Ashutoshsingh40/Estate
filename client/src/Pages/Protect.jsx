import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function Protect() {
    const user1=useSelector(state=> state.userStore.user)
  return (
    <div>
       {
        user1?<Outlet/>:<Navigate to="/sign-in"/>
       }
    </div>
  )
}

export default Protect