import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '../app/store'


interface RouteChangeState {
    
}

const initialState: RouteChangeState = {
    isOpen: false,
    path: '',

} 

const routeChange = createSlice({
    name: 'routeChange',
    initialState,
    reducers: {
        
    },
})


export const routeChangeSelector = (state: AppState) => state.routeChange

export default routeChange.reducer
