import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import About  from './Pages/About'
import Profile from './Pages/Profile'
import Header  from './Componet/Header'
import Protect from './Pages/Protect'
import Listing from './Pages/Listing'
import DetailUserListing from './Pages/DetailUserListing'
import EditListing from './Pages/EditListing'
import Search   from './Pages/Search'
import MessageBox from './Pages/MessageBox'
import Show from  './Pages/Show'
import ShowBook from './Pages/ShowBook'
function App() {
 
  return (
      <BrowserRouter>
     <Header/>
      <Routes>
        <Route path='/' element=<Home/>></Route>
        <Route path='/sign-in' element=<Signin/>></Route>
        <Route path='/sign-up' element=<Signup/>></Route>
        <Route path='/about' element=<About/>></Route>
        <Route element=<Protect/>>
        <Route path='/profile' element=<Profile/>/>
        <Route path='/listing' element=<Listing/>/>
        <Route path='/showlisting' element=<Show/>/>
        <Route path='/showbookmarks'element=<ShowBook/> />
        <Route path='/edit-listing/:_id' element=<EditListing/>/>
        <Route path='/listing/:_id' element=<DetailUserListing/>/>
        <Route path='/listing/:_id/messagebox' element=<MessageBox/>/>
        </Route>
        <Route path='/search' element=<Search/>/>
      </Routes>
     </BrowserRouter> 
     
  )
}

export default App

