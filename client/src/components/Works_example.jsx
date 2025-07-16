import work_1 from '../../assets/work_1.mp4'
import work_2 from '../../assets/work_2.mp4'
import work_3 from '../../assets/work_3.mp4'

function Video({ href, src }) {
  return (
    <a
      className='video_link'
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      <video muted autoPlay loop src={src}></video>
    </a>
  )
}

function Works_example() {
  const videos = [work_1, work_2, work_3]
  const links = [
    'https://vimeo.com/889608599',
    'https://vimeo.com/890283588',
    'https://vimeo.com/1009634929',
  ]

  return (
    <nav className='works_example'>
      {videos.map((video, index) => (
        <Video key={index} href={links[index]} src={video} />
      ))}
    </nav>
  )
}

export { Works_example }
