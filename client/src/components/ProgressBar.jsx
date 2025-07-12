import { useEffect, useState } from 'react'
import '../styles/header.scss'

function ProgressBar() {
  const [Progress, SetProgress] = useState(() => {
    const LastProgress = localStorage.getItem('ProgressBar')
    return LastProgress ? JSON.parse(LastProgress) : 0
  })

  useEffect(() => {
    const scrollHandler = () => {
      const element = document.documentElement
      const TotalH = element.scrollHeight
      const innerH = window.innerHeight
      const PosY = window.scrollY

      const CurProgress = (PosY / (TotalH - innerH)) * 100

      SetProgress(CurProgress)
      localStorage.setItem('ProgressBar', JSON.stringify(CurProgress))
    }

    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <div className='progressbar_fill'>
      <div style={{ width: `${Progress}%` }} className='progressbar'></div>
    </div>
  )
}

export { ProgressBar }
