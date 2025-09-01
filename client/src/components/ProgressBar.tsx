import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { progress } from '../Redux/Slices'
import type { FC } from 'react'
import type { RootState } from '../Redux/store'

// Прогресс прокрутки страницы (прогресс сохраняется в LocalStorage)
const ProgressBar: FC = () => {
  const progressBar = useSelector((state: RootState) => state.progressbar.value)
  const dispatch = useDispatch()

  useEffect(() => {
    function scrollHandler() {
      const TotalH = document.documentElement.scrollHeight
      const innerH = window.innerHeight
      const PosY = window.scrollY

      const current = (PosY / (TotalH - innerH)) * 100

      dispatch(progress(current))
      localStorage.setItem('ProgressBar', JSON.stringify(current))
    }

    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <div className='progressbar_fill'>
      <div style={{ width: `${progressBar}%` }} className='progressbar'></div>
    </div>
  )
}

export { ProgressBar }
