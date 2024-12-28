import {useState,useEffect} from 'react'
import {FaSearch} from 'react-icons/fa'
import { NavLink ,useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Header() {
  const [searchParams]=useSearchParams()
  const[search,setSearch]=useState('');
  console.log('header',searchParams.get('searchterm'))
  useEffect(()=>{
    console.log(searchParams.get('searchterm'))
    setSearch(searchParams.size?searchParams.get('searchterm'):'')
  },[searchParams])
  console.log(search)
  const user1= useSelector(state=>state.userStore.user)
  return (
    <header className='bg-slate-200 shadow-xl'>
     <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
    <NavLink to='/'>
    <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
     <span className='text-slate-500'>Urban</span>
     <span className='text-slate-700'>Nest</span>
     </h1>
    </NavLink>
     <div className='bg-slate-100 p-3 rounded-lg flex justify-between items-center w-24 sm:w-72'>
      <input type='input' placeholder='Search...' className='bg-transparent outline-none 'value={search} onChange={e=>setSearch(e.target.value)} />
     <NavLink to={`/search?searchterm=${search}&type=${'rs'}&offer=${false}&parking=${false}&furnished=${false}&sort=${''}`}><FaSearch className='text-slate-600 cursor-pointer' /></NavLink>
     </div>
     <ul className='flex gap-4'>
      <li className='hidden sm:inline text-slate-700 hover:underline'><NavLink to='/'>Home</NavLink></li>
      <li className='hidden sm:inline text-slate-700 hover:underline'><NavLink to='/about'>About</NavLink></li>
      {
        user1?<NavLink to='/profile'><img src={user1.photo} className='rounded-full w-7 h-7'/></NavLink>
        :<li className='hidden sm:inline text-slate-700 hover:underline'><NavLink to='/sign-in'>Signin</NavLink></li>
      }
     </ul>
     </div>
    </header>
  )
}

export default Header