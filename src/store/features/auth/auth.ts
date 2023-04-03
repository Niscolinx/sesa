import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
} as const

type StateKey = keyof typeof initialState
type StateValue = typeof initialState[StateKey]

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
})
