import { useEffect, useState, useRef } from 'react'
import { SvgCheck, SvgError, SvgMail, SvgWarning, SvgClearField } from './Icons'
import { config } from '../config/Feedback.config'
import axios, { isAxiosError } from 'axios'
import type { FC, FormEvent, ChangeEvent } from 'react'
import type {
  TBtnSendMail,
  TNotification,
  TInputField,
  Tdata,
  TValidData,
  TSendData,
} from '../types/Feedback'

const URL_SERVER = import.meta.env.VITE_URL_SERVER

function Feedback() {
  const initdata = { name: '', email: '', msg: '' }
  const initnotif = { status: '', msg: '' }
  const inittimer = 30
  const delay = 30000

  const [data, setdata] = useState<Tdata>(initdata)
  const [isValid, setisValid] = useState(true)
  const [isLoading, setisLoading] = useState(false)

  const [notif, setnotif] = useState(initnotif)
  const [timer, settimer] = useState<number>(inittimer)
  const [isResend, setisResend] = useState(true)
  const refInter = useRef<number>(null)
  const refTimer = useRef<number>(null)

  const validData = ValidField(data)

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
      if (refInter.current) {
        clearInterval(refInter.current)
        Initial()
      }
    }, delay + 1000)

    return () => {
      if (refInter.current && refTimer.current) {
        clearTimeout(refTimer.current)
        clearInterval(refInter.current)
        Initial()
      }
    }
  }, [isResend])

  function onChangeHandler(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = e.target.name
    const value = e.target.value
    setdata(prev => ({ ...prev, [name]: value }))
  }

  async function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Проверка на повторную отправку
    if (!isResend) {
      setnotif({ status: 'wait', msg: 'Для следующей отправки осталось' })
      return
    }

    // Отправка данных
    if (validData.sum.value) {
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
    <form className='feedback' autoComplete='off' onSubmit={onSubmitHandler}>
      <InputField
        name='name'
        type='text'
        label='Имя'
        placeholder='Введите имя'
        data_valid={!isValid && validData.name}
        data={data.name}
        setdata={setdata}
        onChange={onChangeHandler}
      />
      <InputField
        name='email'
        type='text'
        label='Почта'
        placeholder='Пример: example@mail.ru'
        data_valid={!isValid && validData.email}
        data={data.email}
        setdata={setdata}
        onChange={onChangeHandler}
      />
      <InputField
        name='msg'
        type='text'
        label='Сообщение'
        placeholder='Укажите подробности'
        data_valid={!isValid && validData.msg}
        data={data.msg}
        setdata={setdata}
        onChange={onChangeHandler}
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
function BtnSendMail({ disabled }: TBtnSendMail) {
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
function Notification({ notif, timer }: TNotification) {
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

const InputField: FC<TInputField> = ({
  name,
  type,
  label,
  placeholder,
  data_valid,
  data,
  setdata,
  onChange,
}) => {
  const isError = data_valid && !data_valid.value
  const description = data_valid && data_valid.description
  const refField = useRef<HTMLTextAreaElement>(null)

  let swap_input

  // Адаптивный размер поля msg
  useEffect(() => {
    const autoresize = refField.current

    if (!autoresize) return // Проверка на наличие элемента

    function AutoResizeHandler() {
      if (!autoresize) return

      autoresize.style.height = 'auto'
      const scrollH = autoresize.scrollHeight
      autoresize.style.height = `${scrollH / 16}rem`
    }

    autoresize.addEventListener('input', AutoResizeHandler)
    return () => {
      autoresize.removeEventListener('input', AutoResizeHandler)
    }
  }, [])

  // Очистка поля
  function onClickHandler() {
    // Возврат поля "msg" в исходное состояние
    const autoresize = refField.current
    if (autoresize) autoresize.style.height = 'auto'

    const value = ''
    setdata(prev => ({ ...prev, [name]: value }))
  }

  if (name === 'msg') {
    swap_input = (
      <textarea
        id={name}
        className={`fieldarea ${isError && 'error'}`}
        name={name}
        placeholder={placeholder}
        value={data}
        onChange={onChange}
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
        value={data}
        onChange={onChange}
      />
    )
  }

  return (
    <>
      <div className='fieldwrap'>
        <label className='labelfield' htmlFor={name}>
          {label}
        </label>
        <div className='fieldcontainer'>
          {swap_input}
          {data !== '' && (
            <button className='btnclear' type='button' onClick={onClickHandler}>
              <SvgClearField className='iconclear' />
            </button>
          )}
        </div>
        <p className={`isvaild ${isError && 'view'}`}>{description}</p>
      </div>
    </>
  )
}

// Проверяет введенные поля на валидность
// и возвращает результат в виде объекта (ValidData)
function ValidField(data: Tdata): TValidData {
  const valids = config.valids
  const patterns = config.patterns
  const keys_data = Object.keys(data)

  let count_valid = 0
  const validData: TValidData = {
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

  for (const key of keys_data) {
    switch (key) {
      case 'name':
        if (validData[key].value) {
          count_valid++
        } else if (data[key] === '') {
          validData[key].description = valids.required
        } else if (patterns.symbol.test(data[key])) {
          validData[key].description = `${valids.symbol}: ${data[key].match(
            patterns.symbol
          )}`
        } else validData[key].description = valids.l_name
        break
      case 'email':
        if (validData[key].value) {
          count_valid++
        } else if (data[key] === '') {
          validData[key].description = valids.required
        } else validData[key].description = valids.email
        break
      case 'msg':
        if (validData[key].value) {
          count_valid++
        } else if (data[key] === '') {
          validData[key].description = valids.required
        } else validData[key].description = valids.l_msg
        break
      default:
        break
    }
  }

  if (count_valid === 3) {
    validData.sum.value = true
  }

  return validData
}

// Отправляет валидные данные на сервер
// и возвращает ответ в виде объекта
async function SendData(data: Tdata): Promise<TSendData> {
  let response = ''
  let result = { status: '', msg: '' }

  try {
    const send = await axios.post(URL_SERVER, data)
    response = send.statusText
  } catch (error) {
    if (isAxiosError(error)) {
      response = error.code || 'UNKNOWN_ERROR'
    }
  }

  switch (response) {
    case 'OK':
      result = { status: 'success', msg: 'Письмо успешно отправлено' }
      break
    case 'ERR_NETWORK':
      result = { status: 'error', msg: 'Ошибка отправки на сервер' }
      break
    default:
      result = { status: 'error', msg: 'Неизвестная ошибка' }
      break
  }

  return result
}

export { Feedback }
