import { useEffect, useState, useRef } from 'react'
import { SvgCheck, SvgError, SvgMail, SvgWarning } from './Icons'
import { config } from '../config/feedback.config'
import axios from 'axios'

const URL_SERVER = import.meta.env.VITE_URL_SERVER

function Feedback() {
  const initdata = { name: '', email: '', msg: '' }
  const initnotif = { status: '', msg: '' }
  const inittimer = 30
  const delay = 30000

  const [data, setdata] = useState(initdata)
  const [isValid, setisValid] = useState(true)
  const [isLoading, setisLoading] = useState(false)

  const [notif, setnotif] = useState(initnotif)
  const [timer, settimer] = useState(inittimer)
  const [isResend, setisResend] = useState(true)
  const refInter = useRef(null)
  const refTimer = useRef(null)

  const valid_data = ValidField(data)

  // Таймер отправки
  useEffect(() => {
    if (isResend) return

    const Initial = () => {
      settimer(inittimer)
      setnotif(initnotif)
      setisResend(true)
    }

    refInter.current = setInterval(() => {
      settimer(s => s - 1)
    }, 1000)

    refTimer.current = setTimeout(() => {
      clearInterval(refInter.current)
      Initial()
    }, delay + 1000)

    return () => {
      clearTimeout(refTimer.current)
      Initial()
    }
  }, [isResend])

  function onChangeHandler(e) {
    const name = e.target.name
    const value = e.target.value
    setdata(res => ({ ...res, [name]: value }))
  }

  async function onSubmitHandler(e) {
    e.preventDefault()

    // Проверка на повторную отправку
    if (!isResend) {
      setnotif({ status: 'wait', msg: 'Для следующей отправки осталось' })
      return
    }

    // Отправка данных
    if (valid_data.sum.value) {
      setisValid(true)
      setisLoading(true)
      const result = await SendData(data)
      setisLoading(false)
      setnotif(result)
    } else {
      setisValid(false)
      setnotif(initnotif)
      return // Таймер не запускается
    }

    // Запуск таймера повторной отправки
    setisResend(false)
  }

  return (
    <form
      className='feedback'
      autoComplete='off'
      onChange={onChangeHandler}
      onSubmit={onSubmitHandler}
    >
      <InputField
        name='name'
        type='text'
        label='Имя'
        placeholder='Введите имя'
        data_valid={!isValid && valid_data.name}
      />
      <InputField
        name='email'
        type='text'
        label='Почта'
        placeholder='Пример: example@mail.ru'
        data_valid={!isValid && valid_data.email}
      />
      <InputField
        name='msg'
        label='Сообщение'
        placeholder='Укажите подробности'
        data_valid={!isValid && valid_data.msg}
      />
      <span className='line-split'></span>
      <Notification notif={notif} timer={timer} />
      <BtnSendMail disabled={isLoading} />
    </form>
  )
}

// Иконка загрузки
function LoadingBar() {
  return (
    <div className='loader_out'>
      <div className='loader_in'></div>
    </div>
  )
}

// Настройка кнопки
function BtnSendMail({ disabled }) {
  return (
    <>
      <button className='sendmail' type='submit' disabled={disabled}>
        <div className='sendmail_in'>
          {disabled ? (
            <>
              <LoadingBar />
              <p>Отправка</p>
            </>
          ) : (
            <>
              <SvgMail className='mail' />
              <p>Отправить</p>
            </>
          )}
        </div>
      </button>
    </>
  )
}

// Уведомления об отправки формы
function Notification({ notif, timer }) {
  return (
    <>
      {notif.msg != '' && (
        <div className={`notification ${notif.status}`}>
          {notif.status === 'success' && (
            <>
              <SvgCheck className='icon' />
              <p>{notif.msg}</p>
            </>
          )}
          {notif.status === 'wait' && (
            <>
              <SvgWarning className='icon' />
              <p>{`${notif.msg}: ${timer} секунд`}</p>
            </>
          )}
          {notif.status === 'error' && (
            <>
              <SvgError className='icon' />
              <p>{notif.msg}</p>
            </>
          )}
        </div>
      )}
    </>
  )
}

function InputField({ name, type, label, placeholder, data_valid }) {
  let swap_input
  let isError = data_valid.value === false ? true : false

  const refField = useRef(null)

  // Адаптивный размер поля msg
  useEffect(() => {
    const autoresize = refField.current

    function AutoResizeHandler() {
      autoresize.style.height = 'auto'
      const scrollH = autoresize.scrollHeight
      autoresize.style.height = `${scrollH / 16}rem`
    }

    if (autoresize) {
      autoresize.addEventListener('input', AutoResizeHandler)
      return autoresize.addEventListener('input', AutoResizeHandler)
    }
  }, [])

  if (name === 'msg') {
    swap_input = (
      <textarea
        id={name}
        className={`fieldarea ${isError && 'error'}`}
        name={name}
        placeholder={placeholder}
        ref={refField}
        rows={1}
      />
    )
  } else {
    swap_input = (
      <input
        id={name}
        className={`field ${isError && 'error'}`}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    )
  }

  return (
    <>
      <div className='fieldwrap'>
        <label className='labelfield' htmlFor={name}>
          {label}
        </label>
        {swap_input}
        <p className={`isvaild ${isError && 'view'}`}>
          {data_valid.description}
        </p>
      </div>
    </>
  )
}

// Возвращает ValidData в JSON формате
function ValidField(data) {
  const valids = config.valids
  const patterns = config.patterns
  const keys_data = Object.keys(data)

  let count_valid = 0
  let ValidData = {
    name: {
      value: patterns.name.test(data.name),
      description: '',
    },
    email: {
      value: patterns.email.test(data.email),
      description: '',
    },
    msg: {
      value: patterns.msg.test(data.msg),
      description: '',
    },
    sum: {
      value: false,
      description: '',
    },
  }

  for (let key of keys_data) {
    switch (key) {
      case 'name':
        if (ValidData[key].value) {
          count_valid++
        } else if (data[key] === '') {
          ValidData[key].description = valids.required
        } else if (patterns.symbol.test(data[key])) {
          ValidData[key].description = `${valids.symbol}: ${data[key].match(
            patterns.symbol
          )}`
        } else ValidData[key].description = valids.l_name
        break
      case 'email':
        if (ValidData[key].value) {
          count_valid++
        } else if (data[key] === '') {
          ValidData[key].description = valids.required
        } else ValidData[key].description = valids.email
        break
      case 'msg':
        if (ValidData[key].value) {
          count_valid++
        } else if (data[key] === '') {
          ValidData[key].description = valids.required
        } else ValidData[key].description = valids.l_msg
        break
      default:
        return ValidData
    }
  }

  if (count_valid === 3) {
    ValidData.sum.value = true
  }

  return ValidData
}

// Отправка данных на сервер
async function SendData(data) {
  let response = ''
  let result = {}

  try {
    const responce = await axios.post(URL_SERVER, data)
    response = responce.statusText
  } catch (error) {
    response = error.code
  }

  switch (response) {
    case 'OK':
      result = { status: 'success', msg: 'Письмо успешно отправлено' }
      break
    case 'ERR_NETWORK':
      result = { status: 'error', msg: 'Ошибка отправки на сервер' }
      break
    default:
      result = { status: '', msg: '' }
      break
  }

  return result
}

export { Feedback }
