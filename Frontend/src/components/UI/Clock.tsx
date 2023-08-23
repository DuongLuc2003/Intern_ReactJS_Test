import React , {useState, useEffect}from 'react'

const Clock = () => {
    const [days, setDays] = useState()
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()

    let interval:any;
    const countDown = () => {
        const destination = new Date('Aug 04, 2023').getTime()
        interval = setInterval(()=>{
            const now = new Date().getTime()
            const different = destination - now
            const days:any = Math.floor(different / (1000 * 60 * 60 *24))
            const hours:any = Math.floor((different % (1000 * 60 * 60 *24))/(1000*60*60))
            const minutes:any = Math.floor((different % (1000 * 60 * 60))/ (1000 * 60))
            const seconds:any = Math.floor((different % (1000 * 60 ))/1000)
            if(destination < 0) clearInterval(interval.current)
            else{
                setDays(days)
                setHours(hours)
                setMinutes(minutes)
                setSeconds(seconds)
            }
        })
    }
    useEffect(()=> {
        countDown()
    })
  return(<div className="clock__wrapper d-flex align-items-center gap-3">
  <div className="clock__data d-flex align-items-center gap-3">
  <div className='text-center'>
          <h1 className='text-white fs-1'>{days}</h1>
          <h5 className='text-white fs-5'>Days</h5>
      </div>
      <span className='text-white fs-1'>:</span>
  </div>

      <div className="clock__data d-flex align-items-center gap-3">
  <div className='text-center'>
          <h1 className='text-white fs-1'>{hours}</h1>
          <h5 className='text-white fs-5'>Hours</h5>
      </div>
      <span className='text-white fs-1'>:</span>
  </div>

      <div className="clock__data d-flex align-items-center gap-3">
  <div className='text-center'>
          <h1 className='text-white fs-1'>{minutes}</h1>
          <h5 className='text-white fs-5'>Minutes</h5>
      </div>
      <span className='text-white fs-1'>:</span>
  </div>     
      
  <div className="clock__data d-flex align-items-center gap-3">
  <div className='text-center'>
          <h1 className='text-white fs-1'>{seconds}</h1>
          <h5 className='text-white fs-5'>Secons</h5>
      </div>
  </div>  
</div>) 
}

export default Clock