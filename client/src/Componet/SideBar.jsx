import {useState,useEffect} from 'react'
import { useNavigate,useSearchParams } from 'react-router-dom';
function SideBar() {
      const[searchParams]=useSearchParams();
      const[rs,setRs]=useState(searchParams.size?((searchParams.get('type')==='rent'||searchParams.get('type')==='sale')?false:true):true);
      const[rent,setRent]=useState(searchParams.size?((searchParams.get('type')==='rs'||searchParams.get('type')==='sale')?false:true):false);
      const[sale,setSale]=useState(searchParams.size?((searchParams.get('type')==='rent'||searchParams.get('type')==='rs')?false:true):false);
    const[dropDown,setdropDown]=useState(false);
    const[searchTerm,setsearchTerm]=useState(searchParams.size?searchParams.get('searchterm'):'');
    const[offer,setOffer]=useState(searchParams.size?(searchParams.get('offer')==='true'? true:false):false);
    const[parking,setParking]=useState(searchParams.size?(searchParams.get('parking')==='true'? true:false):false);
    const[furnished,setFurnished]=useState(searchParams.size?(searchParams.get('furnished')==='true'? true:false):false);
    const[sort,setSort]=useState(searchParams.size?searchParams.get('sort'):'');
    const Navigate=useNavigate();
    function listOption()
    { 
        setdropDown(!dropDown)
        if(dropDown==0)
        {
         document.getElementById('drop').style.rotate='180deg'
         document.getElementById('drop').style.color='red'
        }
        else
       { 
        document.getElementById('drop').style.rotate='0deg'
        document.getElementById('drop').style.color='blue'
       } 
    }
     function rentSale(e)
     {
        if(e.target.checked)
        {
          setRs(true)
          document.getElementById('rent').checked=false;
          document.getElementById('sale').checked=false;
          setRent(false)
          setSale(false);
        }
        else
        {
         setRs(true)
         document.getElementById('rs').checked=true;
        }
     }
     function rentfun(e)
     {
       if(e.target.checked)
       {
         setRent(true);
         document.getElementById('rs').checked=false;
         document.getElementById('sale').checked=false;
         setRs(false)
         setSale(false)
       }
       else
       {
         setRent(false)
         setRs(true)
         document.getElementById('rs').checked=true;
       }
     }
     function salefun(e)
     {
      if(e.target.checked)
         {
           setSale(true);
           document.getElementById('rs').checked=false;
           document.getElementById('rent').checked=false;
           setRs(false)
           setRent(false)
         }
         else
         {
           setSale(false)
           setRs(true)
           document.getElementById('rs').checked=true;
         }
     }
     function submitfun(e)
     {
       e.preventDefault();
       if(rs)
       {
        Navigate(`/search?searchterm=${searchTerm}&type=rs&offer=${offer}&parking=${parking}&furnished=${furnished}&sort=${sort}`)
       }
       if(rent)
       {
        Navigate(`/search?searchterm=${searchTerm}&type=rent&offer=${offer}&parking=${parking}&furnished=${furnished}&sort=${sort}`)
       }
       if(sale)
       {
        Navigate(`/search?searchterm=${searchTerm}&type=sale&offer=${offer}&parking=${parking}&furnished=${furnished}&sort=${sort}`)
       }
     }
  return (
    <div >
    <form className='flex flex-col mx-5 my-9 gap-6 ' onSubmit={submitfun}>
    <div className='flex items-center gap-2'>
    <span className='text-lg font-medium' >Search Term:</span>
    <input type='text' placeholder='Search...' className='p-3 w-64 rounded-lg border-2 '
      defaultValue={searchTerm} onChange={e=>setsearchTerm(e.target.value)}/>
    </div>
    <div className=' flex items-center gap-6'>
    <h2 className='text-lg font-medium'>Types:</h2>
    <div className='flex items-center gap-1'>
    <input id='rs' type='checkbox' className='size-5' defaultChecked={rs} onChange={rentSale}/>
    <span>All</span>
    </div>
    <div className='flex items-center gap-1 '>
    <input id='rent' type='checkbox' className='size-5' defaultChecked={rent} onChange={rentfun}/>
    <span>Rent</span>
    </div>
    <div className='flex items-center gap-1 '>
    <input id='sale' type='checkbox' className='size-5' defaultChecked={sale} onChange={salefun}/>
    <span>Sale</span>
    </div>
    <div className='flex items-center gap-1 '>
    <input type='checkbox' className='size-5' defaultChecked={offer} onChange={e=>setOffer(e.target.checked)}/>
    <span>Offer</span>
    </div>
    </div>
    <div className=' flex items-center gap-3'>
    <h2 className='text-lg font-medium'>Amenities:</h2>
    <div className='flex items-center gap-1 '>
    <input type='checkbox' className='size-5' defaultChecked={parking} onChange={e=>setParking(e.target.checked)}/>
    <span>Parking</span>
    </div>
    <div className='flex items-center gap-1 '>
    <input type='checkbox' className='size-5' defaultChecked={furnished} onChange={e=>setFurnished(e.target.checked)}/>
    <span>Furnished</span>
    </div>
    </div>
    <div>
    <div className=' flex items-center gap-2'>
    <h2 className='text-lg font-medium'>Sort:</h2>
   <div className='bg-white rounded-lg border-2 w-44 p-2 flex gap-1 items-center'>
     <p>{sort}</p>
     <h3 id='drop' className='text-2xl font-extrabold text-blue-600 cursor-pointer ' 
     onMouseOver={listOption}>^</h3>
    </div>
    </div>
     {
        !dropDown?'':<div className='flex flex-col mx-12 w-44 rounded-lg border-2 bg-white'>
        <h2 className='hover:bg-blue-400 p-1 rounded-sm'
         onClick={e=>{setSort('Price high to low')
            listOption()}
         }>Price high to low</h2>
        <h2 className='hover:bg-blue-400 p-1 rounded-sm'
         onClick={e=>{setSort('Price low to high')
            listOption()}}>Price low to high</h2>
        <h2 className='hover:bg-blue-400 p-1 rounded-sm'
         onClick={e=>{setSort('Latest')
            listOption()}}>Latest</h2>
        <h2 className='hover:bg-blue-400 p-1 rounded-sm'
         onClick={e=>{setSort('Oldest')
            listOption()}}>Oldest</h2>
        </div>
     }
    </div>
    <button type='submit' className='uppercase p-3 bg-black text-white rounded-lg' >Search</button>
    </form>
    </div>
  )
}
export default SideBar