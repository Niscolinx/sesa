import { isAuthenticated } from './../../utils/token';
import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '../app/store'

const initialState = {
    isAuth: false,
    token: '',
}

type StateKey = keyof typeof initialState
type StateValue = typeof initialState[StateKey]

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        storeToken: (state, action) => {
            const token: string = action.payload
            const expirationDate = new Date().getTime() + 3600 * 1000 // set expiration date to 1 hour from now
            localStorage.setItem(
                'token',
                JSON.stringify({ token, expirationDate })
            )

            state.isAuth = true
        },

        isAuthenticated: (state, _) => {
            const tokenData = localStorage.getItem('token')
            if (tokenData) {
                const { token, expirationDate } = JSON.parse(tokenData)
                if (expirationDate && new Date().getTime() > expirationDate) {
                    console.log('expired token')
                    localStorage.removeItem('token')

                    state.isAuth = false
                }

                state.token = token
            }

            state.isAuth = false
        },

        
    },
})

export const { isAuthenticated, storeToken } = authSlice.actions

export const selectAuth = (state: AppState) => state.auth

export default authSlice.reducer
