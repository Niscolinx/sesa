import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
}

type StateKey = keyof typeof initialState
type StateValue = typeof initialState[StateKey]

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        storeToken: (state, action) => {
            const token: string = action.payload
            // const hashedToken = hashToken(token)
            const expirationDate = new Date().getTime() + 3600 * 1000 // set expiration date to 1 hour from now
            localStorage.setItem(
                'token',
                JSON.stringify({ token, expirationDate })
            )

            state.isAuth = true
        },

        isAuthenticated: (state, action) => {
            const tokenData = localStorage.getItem('token')
            if (tokenData) {
                const { token, expirationDate } = JSON.parse(tokenData)
                if (expirationDate && new Date().getTime() > expirationDate) {
                    console.log('expired token')
                    localStorage.removeItem('token')
                    
                    return state.isAuth = false
                }
                return token
            }
            return state.isAuth = false
        },
    },
})
