import { useEffect, useState } from 'react'
import type { FC } from 'react'

// Прогресс прокрутки страницы (прогресс сохраняется в LocalStorage)
const ProgressBar: FC = () => {
  const [progress, setprogress] = useState<number>(() => {
    const LastProgress = localStorage.getItem('ProgressBar')
    return LastProgress ? JSON.parse(LastProgress) : 0
  })

  useEffect(() => {
    function scrollHandler() {
      const TotalH = document.documentElement.scrollHeight
      const innerH = window.innerHeight
      const PosY = window.scrollY

      const current = (PosY / (TotalH - innerH)) * 100

      setprogress(current)
      localStorage.setItem('ProgressBar', JSON.stringify(current))
    }

    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <div className='progressbar_fill'>
      <div style={{ width: `${progress}%` }} className='progressbar'></div>
    </div>
  )
}

export { ProgressBar }
