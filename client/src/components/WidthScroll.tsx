import { type FC } from 'react'

// Тип для направления строки
type TDirection = {
  data: string[]
  direction?: 'left' | 'right'
}

// Бегущая строка логотипов компании
const WidthScroll: FC<TDirection> = ({ data, direction = 'left' }) => {
  // Дублирование списка для бесшовной прокрутки
  const renderList = [...data, ...data]

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
