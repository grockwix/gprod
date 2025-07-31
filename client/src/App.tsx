import { ProgressBar } from './components/ProgressBar'
import { Welcome } from './components/Welcome.tsx'
import { WidthScroll } from './components/WidthScroll.tsx'
import { WorksExample } from './components/WorksExample.tsx'
import { Feedback } from './components/Feedback.tsx'
import { LinksInFooter } from './components/LinksInFooter.tsx'

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
          <input type='search' placeholder='Поиск' />
          <nav className='menu_bar'>
            <a href='#Home'>Главное</a>
            <a href='#Examples'>Примеры</a>
            <a href='#About_us'>О нас</a>
          </nav>
        </div>
      </header>
      <ProgressBar />
    </div>
  )
}

function Main_sec() {
  return (
    <div className='main_section'>
      <div className='section_1'>
        <Welcome />
      </div>
      <div className='section_2_wrapper'>
        <div className='section_2'>
          <h2>Бренды для примера</h2>
          <WidthScroll />
          <WidthScroll direction='right' />
        </div>
      </div>
      <div id='Examples' className='section_3'>
        <WorksExample />
      </div>
      <div id='Feedback' className='section_4'>
        <h3>Обратная связь</h3>
        <Feedback />
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
    <footer id='About_us'>
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
