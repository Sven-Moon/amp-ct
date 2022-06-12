import React, { useEffect } from 'react'
import { useState } from 'react'


const Dashboard = () => {
  // state = {}

  const [time, setTime] = useState(Date())
  useEffect(() => {setInterval(tick(),1000)},[])


  function tick() {
    setTime(Date())
  }
  
  return (
    <div>Dashboard
      <p>The current time is {time.toLocaleTimeString()}</p>
    </div>
  )
  
}

export default Dashboard