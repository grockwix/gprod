import { ProgressBar } from './components/ProgressBar.jsx'
import { Works_example } from './components/Works_example.jsx'
import { Feedback } from './components/Feedback.jsx'

function Header() {
  return (
    <div className='StickHeader'>
      <header>
        <div className='hdr_1'>
          <a href='/'>
            <img className='logo' src='icons/Logo.svg' />
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
        <h1>
          WEB-Development <span>разработка сайтов</span>
        </h1>
        <div className='welcome'>
          <img className='rub' src='assets/section_1/RUB.png' />
          <div className='canvas'>
            {/* wrapper for line */}
            <span>
              <img className='line' src='assets/section_1/Line.png' />
            </span>
          </div>
        </div>
      </div>
      <div className='section_2_wrapper'>
        <div className='section_2'>
          <h2>Бренды для примера</h2>
          <Width_Scroll />
          <Width_Scroll direction='right' />
        </div>
      </div>
      <div id='Examples' className='section_3'>
        <Works_example />
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
      {/* <SideBar /> */}
      <Main_sec />
    </main>
  )
}

function Width_Scroll({ direction }) {
  const imgs = [
    './assets/w_scroll/sber.png',
    './assets/w_scroll/alfa-bank.png',
    './assets/w_scroll/t-bank.png',
    './assets/w_scroll/yandex.png',
    './assets/w_scroll/X5Group.svg',
    './assets/w_scroll/wb.png',
  ]
  const renderlist = imgs.map(elem => (
    <li key={imgs.indexOf(elem)}>
      <img src={elem} alt='Нет логотипа' />
    </li>
  ))
  return (
    <div className='width_scroll'>
      <ul className='scroll_in' direction={direction}>
        {renderlist}
        {renderlist}
      </ul>
    </div>
  )
}

function SideBar() {
  return (
    <aside>
      <div>Сайдбар</div>
    </aside>
  )
}

function Footer() {
  return (
    <footer id='About_us'>
      <div>
        <a href='http://localhost:5173'>
          <img src='./icons/Gprod.svg' />
        </a>
        <h6>Copyright © 2025 Gprod</h6>
      </div>
      <nav>
        <h4>Ссылки</h4>
        <a href='https://vk.com/geditpro' target='_blank'>
          Вконтакте
        </a>
        <a href='https://t.me/ever4night' target='_blank'>
          Телеграм
        </a>
        <a href='https://vimeo.com/grockwix' target='_blank'>
          Портфолио
        </a>
        <h5>gprodsofcomm@gmail.com</h5>
      </nav>
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
