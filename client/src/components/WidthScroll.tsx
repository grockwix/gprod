import { type FC } from 'react'

// Тип для направления строки
type TDirection = {
  direction?: 'left' | 'right'
}

// Бегущая строка логотипов компании
const WidthScroll: FC<TDirection> = ({ direction = 'left' }) => {
  const imgs = [
    './assets/w_scroll/sber.png',
    './assets/w_scroll/alfa-bank.png',
    './assets/w_scroll/t-bank.png',
    './assets/w_scroll/yandex.png',
    './assets/w_scroll/X5Group.svg',
    './assets/w_scroll/wb.png',
  ]
  // Дублирование списка для бесшовной прокрутки
  const renderList = [...imgs, ...imgs]

  return (
    <div className='WidthScroll'>
      <ul className='scroll_in' data-direction={direction}>
        {renderList.map((elem, index) => (
          <li key={index}>
            <img src={elem} alt='Нет логотипа' />
          </li>
        ))}
      </ul>
    </div>
  )
}

export { WidthScroll }
