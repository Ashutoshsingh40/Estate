import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
function ShowBook() {
  const userId=useSelector(state=>state.userStore.user._id);
  const[book,setBook]=useState([])
  async function Book()
  {
    try{
      const res=await fetch(`/api/listing/getbookmarks?userId=${userId}`);
    const data=await res.json();
    console.log(data.r)
    setBook(data.r)
    }
    catch(err)
    {
      console.log(err)
    }
  }
  useEffect(()=>{
    Book()
  },[])
  return (
    <div>
      <h1 className='text-center text-4xl mt-6 font-bold text-red-600'>BookMarks</h1>
        <div className='w-1/2 ml-96 mt-7'>
          {
            book.map( val=> <Link to={`/listing/${val._id}`} className='border-2 cursor-pointer border-slate-200 my-2 rounded-md flex gap-16 items-center'>
              <img src={val.list[0].url} className='m-4 h-24 w-40 cursor-pointer'/>
              {
                val.name.length<=20?<p className=' text-lg w-48 hover:underline'>{val.name}</p>:<p  className=' text-lg w-48  hover:underline'>{val.name.substring(0,20)}...</p>
              }
              {
                val.address.length<=25?<p className=' text-lg text-blue-600  hover:underline'>{val.address}</p>:<p  className=' text-lg text-blue-600  hover:underline'>{val.address.substring(0,25)}...</p>
              }
              </Link>
           )
          }
        </div>
    </div>
  )
}
export default ShowBook