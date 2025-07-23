import { type FC } from 'react'
import { type TVideo, type TWorks } from '../types/WorksExample'

// Импорт локальных медиа файлов
import work_1 from '../../assets/work_1.mp4'
import work_2 from '../../assets/work_2.mp4'
import work_3 from '../../assets/work_3.mp4'

// Компонент для получения видео с ссылкой
const Video: FC<TVideo> = ({ src, href }) => {
  return (
    <a
      className='video_link'
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      <video muted autoPlay loop src={src} />
    </a>
  )
}

// Основной компонент для вывода видео с ссылкой
const WorksExample: FC = () => {
  const Works: TWorks = [
    { id: 1, src: work_1, href: 'https://vimeo.com/889608599' },
    { id: 2, src: work_2, href: 'https://vimeo.com/890283588' },
    { id: 3, src: work_3, href: 'https://vimeo.com/1009634929' },
  ]

  return (
    <div className='WorksExample'>
      {Works.map(work => (
        <Video key={work.id} href={work.href} src={work.src} />
      ))}
    </div>
  )
}

export { WorksExample }
