import Line from '../../assets/section_1/Line.svg'

function Welcome() {
  return (
    <div className='Welcome'>
      <h1>
        WEB-Development <span>разработка сайтов</span>
      </h1>
      <a className='contact' href='#Feedback'>
        Связаться
      </a>
      <div className='canvas'>
        <img className='rub' src='assets/section_1/RUB.png' />
        <span>
          <img className='line' src={Line} />
        </span>
      </div>
    </div>
  )
}

export { Welcome }
