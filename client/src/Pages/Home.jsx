import {useEffect, useState} from 'react'
import bgImg from '../assets/bg5.webp'
import s1   from   '../assets/s1.webp'
import s2   from   '../assets/s2.webp'
import s3   from   '../assets/s3.webp'
import s4  from   '../assets/s4.webp'
import s5   from   '../assets/s5.webp'
import {useNavigate} from 'react-router-dom'
import Card from '../Componet/Card.jsx'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
function Home() {

  const Navigate=useNavigate();
  const[hgPrice,sethgPrice]=useState([])
  const[lwPrice,setlwPrice]=useState([])
  const[latest,setLatest]=useState([])
  async function getValue1()
  {
    const res=await fetch('/api/home/getvalue?value=hgPrice')
    const data=await res.json()
    sethgPrice(data.r)
  }
  async function getValue2()
  {
    const res=await fetch('/api/home/getvalue?value=lwPrice')
    const data=await res.json()
    setlwPrice(data.r)
  }
  async function getValue3()
  {
    const res=await fetch('/api/home/getvalue?value=latest')
    const data=await res.json()
    setLatest(data.r)
  }
useEffect(()=>{
     getValue1();
     getValue2();
     getValue3();
  },[])
  function Navfun()
  {
    
     Navigate(`/search?searchterm=${''}&type=${'rs'}&offer=${false}&parking=${false}&furnished=${false}&sort=${'Latest'}`)
  }
  return (
    <div  >
     <div >
     <img src={bgImg} className="w-screen" style={{height:655}}/>
     </div>
     <div className='mt-10'>
      <h1 className='text-center text-4xl font-bold hover:text-red-600 hover:cursor-pointer' onClick={Navfun}>Let's Start Now...</h1>
     </div>
      <div className='mt-10'>
      <AwesomeSlider style={{height:610}} >
      <div><img src={s2} style={{height:610}} className='w-screen'/></div>
      <div><img src={s3} style={{height:610}} className='w-screen'/></div>
      <div><img src={s4} style={{height:610}} className='w-screen'/></div>
      <div><img src={s1} style={{height:610}} className='w-screen'/></div>
      <div><img src={s5} style={{height:610}} className='w-screen'/></div>
      </AwesomeSlider>
      </div>
      <div className='mt-12 mx-20 flex flex-col gap-y-14'>
       <div>
       {
        hgPrice.length===0?"":<h2 className='text-3xl font-bold text-blue-600 uppercase  animate-bounce mb-3 '>High Price</h2>
       }
        <div className='flex gap-x-12 gap-y-8 flex-wrap mx-36'>
        {
          hgPrice.map(mes=><Card data={mes} />)
        }
        </div>
       </div>
       <div>
       {
        lwPrice.length===0?'':<h2 className='text-3xl font-bold text-red-600 uppercase  animate-bounce mb-3 '>Low Price</h2>
       }
        <div className='flex gap-x-12 gap-y-8 flex-wrap mx-36'>
        {
          lwPrice.map(mes=><Card data={mes} />)
        }
        </div>
       </div>
       <div className='mb-10'>
       {
        latest.length===0?"":<h2 className='text-3xl font-bold text-zinc-500 uppercase ml-9 animate-bounce mb-3 '>Latest</h2>

       }
        <div className='flex gap-x-12 gap-y-8 flex-wrap mx-36'>
        {
          latest.map(mes=><Card data={mes} />)
        }
        </div>
       </div>
      </div>
    </div>
  )
}
export default Home