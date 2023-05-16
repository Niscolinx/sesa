import { AppState } from '../../app/Store'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
} as const

type StateKey = keyof typeof initialState
type StateValue = (typeof initialState)[StateKey]

const UserSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        updateUser(state, action) {
            const payload = action.payload

            const values = Object.entries(payload)

            values.forEach((item) => {
                const [key, value] = item

                state[key as StateKey] = value as StateValue
            })
        },
        clearUser(state, action) {
            state = initialState
        },
    },

    extraReducers: (builder) => {},
})

export const { clearUser, updateUser } = UserSlice.actions

export const selectUser = (state: AppState) => state.user

export default UserSlice.reducer
