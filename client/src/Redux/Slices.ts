import { combineSlices, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TprogressState, TtimerState } from '../types/Slices.types'

function initProgress(): number {
  const LastProgress = localStorage.getItem('ProgressBar')
  return LastProgress ? JSON.parse(LastProgress) : 0
}

const progressState: TprogressState = {
  value: initProgress(),
}

const timerState: TtimerState = {
  time: 30,
  isResend: true,
}

const progressBarSlice = createSlice({
  name: 'progressbar',
  initialState: progressState,
  reducers: {
    progress: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

const timerSlice = createSlice({
  name: 'timer',
  initialState: timerState,
  reducers: {
    timerTime: state => {
      state.time = state.time - 1
    },
    timerResend: (state, action: PayloadAction<boolean>) => {
      state.isResend = action.payload
    },
    timerReset: () => {
      return timerState
    },
  },
})

const mainReducer = combineSlices(progressBarSlice, timerSlice)

export const { progress } = progressBarSlice.actions
export const { timerTime, timerResend, timerReset } = timerSlice.actions
export default mainReducer
