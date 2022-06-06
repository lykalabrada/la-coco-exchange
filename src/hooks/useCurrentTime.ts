import { useState, useEffect } from 'react'

const useCurrentTime = () => {
  const [datetime, setDatetime] = useState(new Date().toLocaleString())

  useEffect(() => {
      let secondTimer = setInterval( () => {
        setDatetime(new Date().toLocaleString())
      }, 1000)
  
      return () => clearInterval(secondTimer)
  }, [])

  return datetime
}

export default useCurrentTime
