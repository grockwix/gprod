import work_1 from '/assets/work_1.mp4'
import work_2 from '/assets/work_2.mov'
import work_3 from '/assets/work_3.mov'

export function Works_example() {
  return (
    <nav className='works_example'>
      <Video
        className='first'
        src={work_3}
        href='https://vimeo.com/1009634929'
      />
      <Video src={work_1} href='https://vimeo.com/889608599' />
      <Video src={work_2} href='https://vimeo.com/890283588' />
    </nav>
  )
}

function Video({ className, src, href }) {
  return (
    <a className={className} href={href} target='_blank'>
      <video className={className} src={src} autoPlay loop muted />
    </a>
  )
}
