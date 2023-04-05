//import { isAuthenticated } from './../../utils/token';
import { createSlice } from '@reduxjs/toolkit'
import { isAuthenticated } from '../../utils/token'
import { AppState } from '../app/store'

const initialState = {
    isAuth: false,
}

type StateKey = keyof typeof initialState
type StateValue = typeof initialState[StateKey]

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        storeToken: (state, action) => {
            const token: string = action.payload
            const expirationDate = new Date().getTime() + 3600 * 1000 * 5 // set expiration date to 5 hour from now
            localStorage.setItem(
                'token',
                JSON.stringify({ token, expirationDate })
            )

            state.isAuth = true
        },

        setAuth: function (state, action) {
            const auth = action.payload

           state.isAuth = auth
           //state.isAuth= true
        },
    },
})

export const { storeToken, setAuth } = authSlice.actions

export const selectAuth = (state: AppState) => state.auth

export default authSlice.reducer
