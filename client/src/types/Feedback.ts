import type { ChangeEvent } from 'react'

type Tdata = {
  name: string
  email: string
  msg: string
}

type TBtnSendMail = {
  disabled: boolean
}

type TNotification = {
  notif: {
    status: string
    msg: string
  }
  timer: number
}

type TValidResult = {
  value: boolean
  description: string
}

type TInputField = {
  name: string
  type: string
  label: string
  placeholder: string
  data_valid: TValidResult | false
  data: string
  setdata: React.Dispatch<React.SetStateAction<Tdata>>
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

type TValidData = {
  name: TValidResult
  email: TValidResult
  msg: TValidResult
  sum: TValidResult
}
// *Возможно описание при помощи Generic*
type TSendData = {
  status: string
  msg: string
}

export type {
  Tdata,
  TBtnSendMail,
  TNotification,
  TInputField,
  TValidData,
  TSendData,
}
