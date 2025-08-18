import { ProgressBar } from './components/ProgressBar'
import { Welcome } from './components/Welcome.tsx'
import { WidthScroll } from './components/WidthScroll.tsx'
import { WorksExample } from './components/WorksExample.tsx'
import { Feedback } from './components/Feedback.tsx'
import { LinksInFooter } from './components/LinksInFooter.tsx'
import { config } from './config/WidthScroll.config.ts'
import { useInView } from 'react-intersection-observer'
import {
  SkeletonWelcome,
  SkeletonScroll,
  SkeletonFeedback,
  SkeletonWorks,
} from './components/Skeleton.tsx'

function Header() {
  return (
    <div className='StickHeader'>
      <header>
        <div className='hdr_1'>
          <a href='/'>
            <img className='logo' src='assets/icons/Logo.svg' />
          </a>
        </div>
        <div className='hdr_2'>
          <nav className='menu_bar'>
            <a href='#Home'>Главная</a>
            <a href='#Examples'>Работы</a>
            <a href='#Feedback'>Обратная связь</a>
          </nav>
        </div>
      </header>
      <ProgressBar />
    </div>
  )
}

function Main_sec() {
  // Для динамической загрузки секций
  const { ref: ref1, inView: inView1 } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })
  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })
  const { ref: ref3, inView: inView3 } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })
  const { ref: ref4, inView: inView4 } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  return (
    <div className='main_section'>
      <div ref={ref1} className={`section_1`}>
        {inView1 ? <Welcome /> : <SkeletonWelcome />}
      </div>
      <div className='section_2_wrap'>
        <div ref={ref2} className={`section_2`}>
          {inView2 ? (
            <>
              <h2>Бренды для примера</h2>
              <WidthScroll data={config.scroll_1} />
              <WidthScroll data={config.scroll_1} direction='right' />
            </>
          ) : (
            <SkeletonScroll />
          )}
        </div>
      </div>
      <div ref={ref3} id='Examples' className={`section_3`}>
        {inView3 ? <WorksExample /> : <SkeletonWorks />}
      </div>
      <div className='section_4_wrap'>
        <div ref={ref4} id='Feedback' className={`section_4`}>
          {inView4 ? (
            <>
              <h3>Обратная связь</h3>
              <Feedback />
            </>
          ) : (
            <SkeletonFeedback />
          )}
        </div>
      </div>
    </div>
  )
}

function Main() {
  return (
    <main>
      <Main_sec />
    </main>
  )
}

function Footer() {
  return (
    <footer>
      <div>
        <a href='/'>
          <img src='assets/icons/Gprod.svg' />
        </a>
        <h6>Copyright © 2025 Gprod</h6>
      </div>
      <LinksInFooter />
    </footer>
  )
}

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  )
}

export default App
