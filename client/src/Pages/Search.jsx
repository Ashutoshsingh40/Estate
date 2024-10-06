import React from 'react'
import SideBar from '../Componet/SideBar.jsx'
import ResultBar from '../Componet/ResultBar.jsx'
function Search() {
  return (
    <div className='flex gap-4'>
        <SideBar/>
        <ResultBar/>
    </div>
  )
}
export default Search;