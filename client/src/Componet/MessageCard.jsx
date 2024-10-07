import { useEffect,useState } from 'react';
import { io } from 'socket.io-client';
function MessageCard(props) {
  const socket = io('/api/socket');
  const [message,setMessage]=useState([])
  const [input,setInput]=useState()
  async function MessageFun(thirdParty)
  {
    const res=await fetch('/api/interface/userdetail',
      {
        'method':"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({thirdParty})
      }
    )
    const data=await res.json();
    console.log(data)
    setMessage(data.messagebox);
  }
  useEffect(()=>{
    MessageFun(props.data.thirdParty);
},[props.data])
  async function Room()
  {
    setInput('')
    const res=await fetch('/api/interface/message',
      {
        'method':"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({thirdParty:props.data.thirdParty,mess:input})
      }
    )
    socket.emit('message',{mess:input,thirdParty:props.data.thirdParty})
    
    socket.off('message');
  }
  useEffect(()=>{
      socket.on(`${props.data.thirdParty}`,(data)=>
        {
          console.log(input)
          setMessage(prev=>[...prev,data])
        })
        return () => {
          socket.off(`${props.data.thirdParty}`);
        };
  })
    return (
      <div className='  flex-1'>
          <div className='flex flex-col gap-3 '>
          <div style={{height:550}} className='flex flex-col gap-4 overflow-y-scroll bg-black p-4 rounded-lg   '>
             {
              message.map(d=><h3 className='bg-green-600  text-lg w-fit h-fit  p-3 rounded-md mt-2  text-white '>{d}</h3>)
             }
        </div>
        <div className=' flex gap-3 items-center justify-end'>
            <input type='text' placeholder='MessageBox...' style={{width:900}} className='p-4  rounded-xl border-2 border-orange-500' value={input} onChange={e=>setInput(e.target.value)}/>
            <button className='bg-blue-500 border-2 p-3 rounded-lg w-16' onClick={Room} >Send</button>
        </div>
          </div>
      </div>
    )
}
export default MessageCard